<script>
    export let meals = [
        { 
            id: 'bf', 
            label: 'Bf', 
            time: '6:30', 
            description: 'Chicken and eggs', 
            type: 'breakfast',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        },
        { 
            id: 'sn1', 
            label: 'Sn', 
            time: '10:30', 
            description: 'coffee + cake', 
            type: 'snack',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        },
        { 
            id: 'lu', 
            label: 'Lu', 
            time: '6:30', 
            description: 'Slow cooking Beef + breads', 
            type: 'lunch',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        },
        { 
            id: 'sn2', 
            label: 'Sn', 
            time: '12:30', 
            description: 'coffee break', 
            type: 'snack',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        },
        { 
            id: 'di', 
            label: 'Di', 
            time: '6:30', 
            description: 'coffee break', 
            type: 'dinner',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        },
        { 
            id: 'pr1', 
            label: 'Pr', 
            time: '3:30', 
            description: 'coffee break', 
            type: 'pre-workout',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        },
        { 
            id: 'pr2', 
            label: 'Pr', 
            time: '6:30', 
            description: 'coffee break', 
            type: 'pre-workout',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        },
        { 
            id: 'or', 
            label: 'Or', 
            time: '5:30', 
            description: 'some cheat meals', 
            type: 'other',
            calories: 1268,
            protein: 25,
            carbs: 16,
            fat: 25
        }
    ];

    // Function to get icon based on meal type
    function getIcon(type) {
        switch(type) {
            case 'breakfast': return '🍳';
            case 'lunch': return '🍲';
            case 'dinner': return '🍽️';
            case 'snack': return '☕';
            case 'pre-workout': return '💪';
            case 'other': return '🍔';
            default: return '🍴';
        }
    }

    // Function to get color based on meal type
    function getColor(type) {
        switch(type) {
            case 'breakfast': return '#2ecc71'; // green
            case 'lunch': return '#2ecc71'; // green
            case 'dinner': return '#2ecc71'; // green
            case 'snack': return '#9b59b6'; // purple
            case 'pre-workout': return '#f1c40f'; // yellow
            case 'other': return '#95a5a6'; // gray
            default: return '#3498db'; // blue
        }
    }
</script>

<div class="meal-plan">
    <div class="header">
        <h2>MEAL PLAN</h2>
        <div class="header-icons">
            <button class="icon-button">✏️</button>
            <button class="icon-button">👁️</button>
            <button class="icon-button">📊 Report</button>
        </div>
    </div>
    
    <div class="meals-container">
        {#each meals as meal}
            <div class="meal-row">
                <div class="meal-label" style="color: {getColor(meal.type)}">
                    {meal.label}
                </div>
                <div class="meal-icon" style="color: {getColor(meal.type)}">
                    {getIcon(meal.type)}
                </div>
                <div class="meal-description" style="color: {getColor(meal.type)}">
                    {meal.description}
                </div>
                <div class="meal-time">
                    <span class="time-icon">🕒</span>
                    {meal.time}
                </div>
                <div class="meal-checkbox">
                    <div class="checkbox" style="border-color: {getColor(meal.type)}"></div>
                </div>
                <div class="meal-stats">
                    <div class="stat">{meal.calories}</div>
                    <div class="stat">{meal.protein}</div>
                    <div class="stat">{meal.carbs}</div>
                    <div class="stat">{meal.fat}</div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .meal-plan {
        background-color: #2c2c2c;
        border-radius: 10px;
        padding: 15px;
        color: white;
        font-family: Arial, sans-serif;
        max-width: 600px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .header h2 {
        color: #2ecc71;
        margin: 0;
        font-size: 24px;
    }

    .header-icons {
        display: flex;
        gap: 10px;
    }

    .icon-button {
        background: none;
        border: none;
        color: #7f8c8d;
        cursor: pointer;
        font-size: 14px;
        padding: 5px;
    }

    .meals-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .meal-row {
        display: grid;
        grid-template-columns: 40px 30px 1fr 80px 40px repeat(4, 40px);
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #3a3a3a;
    }

    .meal-label {
        font-weight: bold;
        font-size: 16px;
    }

    .meal-icon {
        font-size: 16px;
    }

    .meal-description {
        font-size: 14px;
    }

    .meal-time {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #7f8c8d;
        font-size: 14px;
    }

    .time-icon {
        font-size: 12px;
    }

    .meal-checkbox {
        display: flex;
        justify-content: center;
    }

    .checkbox {
        width: 18px;
        height: 18px;
        border: 2px solid;
        border-radius: 4px;
    }

    .meal-stats {
        display: flex;
        gap: 10px;
    }

    .stat {
        color: #2ecc71;
        font-size: 14px;
        text-align: center;
    }
</style>