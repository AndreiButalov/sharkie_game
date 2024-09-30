function startViewGenerate() {
    return /*html*/`
        <div class="content">
            <h1>SHARKIE</h1>        
            <div class="start">
                <button class="start_button" onclick="startGames()">START</button>
            </div>
            <div class="controls">
                <img class="sharkie_image" src="img/1.Sharkie/1.IDLE/1.png">

                <div class="controls_menu">
                    <div class="control_menu_left">
                        <img class="button_arrows" src="img/6.Botones/Key/arrow keys.png" alt="">
                        <span>MOVE SHARK</span>
                    </div>
                    <div class="control_menu_left">
                        <img class="button_space" src="img/6.Botones/Key/Space Bar key.png" alt="">
                        <span>ATTACK</span>
                    </div>
                </div>

            </div>
        </div>
    `;
}


function controlsPanelGenerate() {
    return /*html*/`
        <div class="controls_panel_content">            
            <div class="button_group">
                <button class="buttons" onclick="sayHallo()"></button>
                <button class="buttons" onclick="sayHallo()"></button>
                <button class="buttons" onclick="sayHallo()"></button>                
            </div>
        </div>
    `;
}


function tryAgainGenerate() {
    return /*html*/`
        <div>
            <button class="start_button button_try_again" onclick="tryAgain()">Try Again</button>
        </div>
    `;
}


function gameOverGenerate() {
    return /*html*/`
        <div>
            <h1>GAME OVER</h1>
            <button class="start_button button_try_again" onclick="tryAgain()">Try Again</button>
        </div>
    `;
}