<script>
  let balance = $state(0);
  let transactions = $state([]);
  let amount = $state("");
  let description = $state("");
  let type = $state("income");

  let totalIncome = $derived(
    transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  let totalExpense = $derived(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  function addTransaction() {
    if (!amount || !description) return;

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      description: description.trim(),
      type,
      date: new Date().toLocaleString(),
    };

    transactions = [newTransaction, ...transactions];

    if (type === "income") {
      balance += newTransaction.amount;
    } else {
      balance -= newTransaction.amount;
    }

    amount = "";
    description = "";
  }

  function deleteTransaction(id) {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      if (transaction.type === "income") {
        balance -= transaction.amount;
      } else {
        balance += transaction.amount;
      }
      transactions = transactions.filter((t) => t.id !== id);
    }
  }
</script>

<div class="app">
  <div class="card">
    <div class="balance-card">
      <div class="balance-label">Current Balance</div>
      <div class="balance-amount" class:negative={balance < 0}>
        ${balance.toFixed(2)}
      </div>
    </div>

    <div class="summary">
      <div class="summary-item income">
        <svg
          class="summary-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 5v14M5 12l7-7 7 7" />
        </svg>
        <div class="summary-text">
          <div class="summary-label">Income</div>
          <div class="summary-value">${totalIncome.toFixed(2)}</div>
        </div>
      </div>
      <div class="summary-item expense">
        <svg
          class="summary-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 19V5M5 12l7 7 7-7" />
        </svg>
        <div class="summary-text">
          <div class="summary-label">Expense</div>
          <div class="summary-value">${totalExpense.toFixed(2)}</div>
        </div>
      </div>
    </div>

    <div class="add-transaction">
      <h2>Add Transaction</h2>

      <div class="type-selector">
        <button
          onclick={() => (type = "income")}
          class="type-btn {type === 'income' ? 'active income' : ''}"
        >
          Income
        </button>
        <button
          onclick={() => (type = "expense")}
          class="type-btn {type === 'expense' ? 'active expense' : ''}"
        >
          Expense
        </button>
      </div>

      <div class="form">
        <input
          type="number"
          bind:value={amount}
          placeholder="Amount"
          step="0.01"
          class="input"
        />
        <input
          type="text"
          bind:value={description}
          placeholder="Description"
          class="input"
        />
        <button onclick={addTransaction} class="btn-add">
          <svg
            class="btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Transaction
        </button>
      </div>
    </div>

    <div class="transactions">
      <h2>Recent Transactions</h2>
      {#if transactions.length === 0}
        <div class="empty-state">
          <svg
            class="empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
          <p>No transactions yet</p>
        </div>
      {:else}
        <div class="transaction-list">
          {#each transactions as transaction (transaction.id)}
            <div class="transaction-item {transaction.type}">
              <div class="transaction-info">
                <div class="transaction-desc">{transaction.description}</div>
                <div class="transaction-date">{transaction.date}</div>
              </div>
              <div class="transaction-right">
                <div class="transaction-amount">
                  {transaction.type === "income"
                    ? "+"
                    : "-"}${transaction.amount.toFixed(2)}
                </div>
                <button
                  onclick={() => deleteTransaction(transaction.id)}
                  class="delete-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
    padding: 2rem 1rem;
  }

  .card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(71, 85, 105, 0.5);
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    padding: 2rem;
    max-width: 42rem;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 50%;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.5);
  }

  .icon {
    width: 2rem;
    height: 2rem;
    color: white;
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin: 0 0 0.5rem 0;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin: 0 0 1rem 0;
  }

  .subtitle {
    color: #94a3b8;
    margin: 0;
    font-size: 0.875rem;
  }

  .balance-card {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    padding: 2rem;
    border-radius: 1.25rem;
    text-align: center;
    margin-bottom: 1.5rem;
    box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
  }

  .balance-label {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .balance-amount {
    color: white;
    font-size: 3rem;
    font-weight: 700;
  }

  .balance-amount.negative {
    color: #fca5a5;
  }

  .summary {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .summary-item {
    background: rgba(30, 41, 59, 0.8);
    border-radius: 1rem;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(71, 85, 105, 0.5);
  }

  .summary-item.income {
    border-left: 3px solid #10b981;
  }

  .summary-item.expense {
    border-left: 3px solid #ef4444;
  }

  .summary-icon {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
  }

  .summary-item.income .summary-icon {
    color: #10b981;
  }

  .summary-item.expense .summary-icon {
    color: #ef4444;
  }

  .summary-text {
    flex: 1;
  }

  .summary-label {
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .summary-value {
    color: white;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .add-transaction {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(71, 85, 105, 0.5);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .type-selector {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .type-btn {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: none;
    background: rgba(51, 65, 85, 0.5);
    color: #cbd5e1;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .type-btn:hover {
    background: rgba(51, 65, 85, 1);
  }

  .type-btn.active.income {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }

  .type-btn.active.expense {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .input {
    padding: 0.875rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(71, 85, 105, 0.5);
    background: rgba(15, 23, 42, 0.5);
    color: white;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
  }

  .input:focus {
    border-color: #10b981;
    background: rgba(15, 23, 42, 0.8);
  }

  .input::placeholder {
    color: #64748b;
  }

  .btn-add {
    padding: 0.875rem;
    border-radius: 0.5rem;
    border: none;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;
    box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
  }

  .btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 35px -10px rgba(16, 185, 129, 0.4);
  }

  .btn-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .transactions {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(71, 85, 105, 0.5);
    border-radius: 1rem;
    padding: 1.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #64748b;
  }

  .empty-icon {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    opacity: 0.5;
  }

  .empty-state p {
    margin: 0;
    font-size: 0.875rem;
  }

  .transaction-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .transaction-item {
    background: rgba(15, 23, 42, 0.5);
    border-radius: 0.75rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 3px solid transparent;
    transition: all 0.2s;
  }

  .transaction-item:hover {
    background: rgba(15, 23, 42, 0.8);
  }

  .transaction-item.income {
    border-left-color: #10b981;
  }

  .transaction-item.expense {
    border-left-color: #ef4444;
  }

  .transaction-info {
    flex: 1;
  }

  .transaction-desc {
    color: white;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .transaction-date {
    color: #64748b;
    font-size: 0.75rem;
  }

  .transaction-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .transaction-amount {
    font-weight: 700;
    font-size: 1.125rem;
  }

  .transaction-item.income .transaction-amount {
    color: #10b981;
  }

  .transaction-item.expense .transaction-amount {
    color: #ef4444;
  }

  .delete-btn {
    width: 2rem;
    height: 2rem;
    padding: 0.375rem;
    border: none;
    border-radius: 0.375rem;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    cursor: pointer;
    transition: all 0.2s;
  }

  .delete-btn:hover {
    background: rgba(239, 68, 68, 0.2);
  }

  @media (max-width: 640px) {
    .summary {
      grid-template-columns: 1fr;
    }

    .balance-amount {
      font-size: 2.5rem;
    }
  }
</style>
