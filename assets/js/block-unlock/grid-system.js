import { Tile } from "/assets/js/block-unlock/tile.js";

export class Grid {
    static currentGridData = null;
    static tileLibrary = [1,2,3,4,5,6,7,8,9];

    constructor(Xsize,Ysize,defaultValue=0){
        this.Xsize=Xsize;
        this.Ysize=Ysize;
        this.grid=Array.from({length:Ysize},()=>Array(Xsize).fill(defaultValue));
        this.tileMap={};
        this.subscribers=[];
        this.selectedTile=null;
        this.startGame=false; // cannot start pushers until true
    }

    SetToGrid(){ Grid.currentGridData=this; }
    subscribe(cb){ this.subscribers.push(cb); }
    notify(x,y){ for(const cb of this.subscribers) cb(x,y,this.get(x,y)); }

    set(x,y,value){ if(x<0||x>=this.Xsize||y<0||y>=this.Ysize) return; this.grid[y][x]=value; this.notify(x,y); }
    get(x,y){ if(x<0||x>=this.Xsize||y<0||y>=this.Ysize) return null; return this.grid[y][x]; }

    addTile(tile){ if(!tile.direction) tile.direction='north'; const [x,y]=tile.CordLocation; this.tileMap[`${x},${y}`]=tile; this.set(x,y,tile.State); }

    selectTile(coords){
        const [x,y]=Array.isArray(coords)?coords:[coords,arguments[1]];
        const key=`${x},${y}`;
        const tile=this.tileMap[key];
        if(tile && tile.State!==0 && tile.State!==9) this.selectedTile=tile;
        else this.selectedTile=null;
    }

    moveSelected(direction){
        if(!this.selectedTile) return;
        const map={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
        const [dx,dy]=map[direction];
        if(dx===undefined&&dy===undefined) return;

        const [sx,sy]=this.selectedTile.CordLocation;
        const tilesToMove=[];
        if(dx!==0){
            let curX=sx;
            while(curX>=0&&curX<this.Xsize){
                const t=this.tileMap[`${curX},${sy}`];
                if(t&&t.State!==0){ if(t.State===9) return; tilesToMove.push(t); } else break;
                curX+=dx;
            }
            const last=tilesToMove[tilesToMove.length-1];
            const newX=last.CordLocation[0]+dx;
            if(newX<0||newX>=this.Xsize|| (this.tileMap[`${newX},${sy}`]&&this.tileMap[`${newX},${sy}`].State!==0)) return;
        } else if(dy!==0){
            let curY=sy;
            while(curY>=0&&curY<this.Ysize){
                const t=this.tileMap[`${sx},${curY}`];
                if(t&&t.State!==0){ if(t.State===9) return; tilesToMove.push(t); } else break;
                curY+=dy;
            }
            const last=tilesToMove[tilesToMove.length-1];
            const newY=last.CordLocation[1]+dy;
            if(newY<0||newY>=this.Ysize|| (this.tileMap[`${sx},${newY}`]&&this.tileMap[`${sx},${newY}`].State!==0)) return;
        }

        for(let i=tilesToMove.length-1;i>=0;i--){
            const t=tilesToMove[i];
            const [ox,oy]=t.CordLocation;
            const nx=ox+dx, ny=oy+dy;
            delete this.tileMap[`${ox},${oy}`];
            t.CordLocation=[nx,ny];
            this.tileMap[`${nx},${ny}`]=t;
            this.set(ox,oy,0);
            this.set(nx,ny,t.State);
        }
        this.selectedTile=tilesToMove.find(t=>t===this.selectedTile);
    }

    startPushers(){ for(const k in this.tileMap){ const t=this.tileMap[k]; if(t && t.isPusher()) t.startPushing(this); } }
    stopAllPushers(){ for(const k in this.tileMap){ const t=this.tileMap[k]; if(t && t.isPusher()) t.stopPushing(); } }

    rotateSelected(clockwise=true){
        if(!this.selectedTile) return;
        if(clockwise) this.selectedTile.rotateClockwise();
        else this.selectedTile.rotateCounterClockwise();
        const [x,y]=this.selectedTile.CordLocation;
        this.notify(x,y);
    }
}
