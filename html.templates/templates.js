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

function controlButtonsGenerate() {
    return /*html*/`
        <div class="all_controls_button">
            <div id="nav_bar_button" class="nav_bar_button">
                    <button id="btn_pause" class="buttons"><img src="img/Daco_4414172.png"/></button>
                    <button id="btn_sound" class="buttons"><img src="img/pngwing.com.png"/></button>
                    <button id="btn_fullScreen" class="buttons"><img src="img/fullScreen.png"></button>
            </div>
            <div class="mobile_panel">
                <div class="controls_button_mobile">
                    <div class="up_button_mobilie">
                        <button id="btn_up">&#8679;</button>
                    </div>
                    <div class="left_right_button_mobile">
                        <button id="btn_left">&#8678;</button>
                        <button id="btn_down">&#8681;</button>
                        <button id="btn_right">&#8680;</button>
                    </div>
                </div>
                <div class="trow_button_mobile">
                    <button id="btn_fire">T</button>
                </div>
            </div>
        </div>
    `;
}


function tryAgainGenerate() {
    return /*html*/`
        <div id="div_you_win">
            <button class="start_button button_try_again" onclick="tryAgain()">Try Again</button>
        </div>
    `;
}


function gameOverGenerate() {
    return /*html*/`
        <div id="div_game_over">
            <h1>GAME OVER</h1>
            <button class="start_button button_try_again" onclick="tryAgain()">Try Again</button>
        </div>
    `;
}