const shapes=[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],[
        [1,1,1],
        [0,0,1],
        [0,0,0]
    ],[
        [1,1],
        [1,1],
    ],[
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],[
        [1,1,1],
        [1,0,0],
        [0,0,0]
    ],[
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],[
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ]
];
const colors=[
    'aqua',
    'brown',
    'salmon',
    'teal',
    'mediumseagreen',
    'yellow',
    'gold',
];
const cols=10;
const rows=20;
const scale=32;
const gameEl=document.getElementById('games');
const ctx=gameEl.getContext('2d');
class Pieces{
    constructor(shape,color,ctx){
        this.shape=shape;
        this.color=color;
        this.ctx=ctx;
        this.y=0;
        this.x=Math.floor(cols/2)
    };
    renderPiece(){
        this.shape.map((row,i)=>{
            row((cell,j)=>{
                if(cell!==0){
                    this.ctx.fillStyle=this.color;
                    this.ctx.fillRect(this.x+j,this.y+i,1,1);
                    this.ctx.strokeStyle='black';
                    this.ctx.strokeRect(this.x+j,this.y+i,1,1)
                }
            })
        })
    }
}
class GameModel{
    constructor(ctx){
        this.ctx=ctx;
        this.fallingPiece=null;
        this.grid=this.makeStartingGrid();
    }
    makeStartingGrid(){
        let grid=[];
        for(let i=0;i<rows;i++){
            grid[i]=[]
            for(let j=0;j<cols;j++){
                grid[i][j]=0
            }
        }
        return grid
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;this.grid[i].length;j++){
                let cell =this.grid[i][j]
                this.ctx.fillStyle='black';
                this.ctx.fillRect(j,i,1,1)
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece();
        }
    }
}
ctx.scale(scale,scale)
const model=new GameModel(ctx);
setInterval(()=>{
    newGameState()
},100)
function newGameState(){
    if(model.fallingPiece===null){
        const rand=Math.floor(Math.random()*shapes.length)
        const piece=new Pieces(shapes[rand],colors[rand],ctx);
        model.fallingPiece=piece;
        model.renderGameState();
    }
}