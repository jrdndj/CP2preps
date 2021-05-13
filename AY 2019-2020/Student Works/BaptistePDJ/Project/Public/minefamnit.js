
class Minefield {
    /* Construct a minefield with the given width, height, and the number of mines. */
    constructor(width, height, mines) {
        /* Sanitize input parameters. */
        width = Number(width);
        height = Number(height);
        mines = Number(mines);
        if (!Number.isInteger(width)) width = 8;
        if (!Number.isInteger(height)) height = 8;
        if (!Number.isInteger(mines)) mines = 10;
        
        /* Validate input parameters. */
        if (width < 1) width = 1;
        if (height < 1) height = 1;
        if (mines > width * height) mines = width * height;
        
        /* Initialize the minefield. */
        this.fieldWidth = width;
        this.fieldHeight = height;
        this.fieldMines = mines;
        this.field = new Array(width);
        this.veil = new Array(width);
        for (var x = 0; x < width; x++) {
            this.field[x] = new Array(height);
            this.veil[x] = new Array(height);
            for (var y = 0; y < height; y++) {
                this.field[x][y] = ' ';
                this.veil[x][y] = true;
            }
        }
        
        /* Place mines. */
        var placed = 0;
        while (placed < mines) {
            var x = Math.floor(Math.random() * this.width);
            var y = Math.floor(Math.random() * this.height);
            if (this.field[x][y] == ' ') {
                this.field[x][y] = '<img class="mine" src="mine.png" alt="mine">';
                placed++;
            }
        }
        
        /* Compute numbers. */
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                if (this.field[x][y] == ' ') {
                    var count = 0;
                    for (var dx = -1; dx <= 1; dx++) {
                        for (var dy = -1; dy <= 1; dy++) {
                            var x0 = x + dx;
                            var y0 = y + dy;
                            if (x0 >= 0 && x0 < width && y0 >= 0 && y0 < height)
                                count += (this.field[x0][y0] == '<img class="mine" src="mine.png" alt="mine">' ? 1 : 0);
                        }
                    }
                    this.field[x][y] = '' + count;
                }
            }
        }
    }
    
    /* Return the width of the field. */
    get width() {
        return this.fieldWidth;
    }
    
    /* Return the height of the field. */
    get height() {
        return this.fieldHeight;
    }
    get mines(){
        return this.fieldMines;
    }
    /* Return the number of veiled tiles. */
    get veiled() {
        /* Get global variables. */
        var veil = this.veil;
        var width = this.width;
        var height = this.height;
        
        var count = 0;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < width; y++) {
                if (veil[x][y]) count++;
            }
        }
        
        return count;
    }
    
    /* Return the number of explosions until now. */
    get explosions() {
        /* Get global variables. */
        var field = this.field;
        var veil = this.veil;
        var width = this.width;
        var height = this.height;
        
        var count = 0;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < width; y++) {
                if (!veil[x][y] && field[x][y] == '<img class="mine" src="mine.png" alt="mine">')
                    count++;
            }
        }
        
        return count;
    }
    
    /* Return the visible symbol on a tile. */
    symbol(x, y) {
        /* Sanitize input parameters. */
        var x0 = Number(x);
        var y0 = Number(y);
        if (!Number.isInteger(x0) || !Number.isInteger(y0))
            return '.';
        
        /* Get global variables. */
        var field = this.field;
        var veil = this.veil;
        var width = this.width;
        var height = this.height;
            
        /* Return the symbol. */
        if (x0 >= 0 && x0 < width && y0 >= 0 && y0 < height && !veil[x0][y0])
            return field[x0][y0];
        else
            return '.';
    }
    
    unveil(x, y) {
        /* Sanitize input parameters. */
        var x0 = Number(x);
        var y0 = Number(y);
        if (!Number.isInteger(x0) || !Number.isInteger(y0))
            return;
        
        /* Get global variables. */
        var field = this.field;
        var veil = this.veil;
        var width = this.width;
        var height = this.height;
        
        /* Check input parameters. */
        if (x0 < 0 || x0 >= width || y0 < 0 || y0 >= height) return;
        if (!veil[x0][y0]) return;
        
        /* Unveil tiles. */
        var tiles = [[x0, y0]];
        while (tiles.length > 0) {
            var tile = tiles.pop();
            x0 = tile[0];
            y0 = tile[1];
            veil[x0][y0] = false;
            if (field[x0][y0] == '0') {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var x1 = x0 + dx;
                        var y1 = y0 + dy;
                        if (x1 >= 0 && x1 < width && y1 >= 0 && y1 < height && veil[x1][y1])
                            tiles.push([x1, y1]);
                    }
                }
            }
        }
    }
    
    /* Return representation of the field as string. */
    tString() {
        var output = "";
        for (var y = 0; y < this.height; y++) {
            output += '<div class="container"><div class="row">';
            for (var x = 0; x < this.width; x++) {
                if (!this.veil[x][y])
                    output += '<div class="col-sm case" id="unveiled">' + this.field[x][y] + '</div>';
                else
                    output += '<div class="col-sm case" onclick="hit(' + x + ', ' + y + ')">O</div>';
            }
            output += '</div></div>';
        }
        return output;
    }
}