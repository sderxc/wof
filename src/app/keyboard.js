var virKeyBoard = virKeyBoard || {};

virKeyBoard = function(game) {
    var _this = this;
    game.virKB = {};
    var config = {
        firstrow: [
            'й',
            'ц',
            'у',
            'к',
            'е',
            'н',
            'г',
            'ш',
            'щ',
            'з',
            'х',
            'ъ'
        ],
        secondRow: [
            'ф',
            'ы',
            'в',
            'а',
            'п',
            'р',
            'о',
            'л',
            'д',
            'ж',
            'э'
        ],
        thirdRow: [
            'я',
            'ч',
            'с',
            'м',
            'и',
            'т',
            'ь',
            'б',
            'ю',
            'ё'
        ]

    };
    return {
        init: function(clickCb) {
            game.virKB = game.add.group();
            var y = 350;
            for (var row in config) {
                var x = 100;
                for (var leter in config[row]) {
                    var button = game.make.button(x, y, 'PLATES', removeGroup, this, 2, 1, 0);
                    button.name = config[row][leter];
                    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: button.width, align: "center"};
                    var text = game.add.text(20,15, button.name, style);
                    button.addChild(text);
                    game.virKB.add(button);
                    x+=63;
                }
                y+=63;
            }

            function removeGroup(el) {
                console.log(el.name);
                clickCb(el.name);
            }
        }
    };
};