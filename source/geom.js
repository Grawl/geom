function initialize(){

// create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x97c56e, true);

// create a renderer instance
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null);

    var count = 0;
// add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    renderer.view.style.position = "absolute";
    renderer.view.style.top = "0px";
    renderer.view.style.left = "0px";
    requestAnimationFrame( animate );

// create a texture from an image path
//    var texture = PIXI.Texture.;
//var tilingTexture = new PIXI.TilingTexture(texture.baseTexture);

//    var tilingSprite = new PIXI.TilingSprite(texture, window.innerWidth, window.innerHeight);

    var graphics = new PIXI.Graphics();


    stage.addChild(graphics);

    function animate() {

        requestAnimationFrame( animate );
        count += 0.05;
        graphics.clear();

        graphics.beginFill(0xFF0000,1);

        // rectangle
        graphics.drawRect(200 + 50*Math.sin(count),200 + 50*Math.cos(count),200 + 50*Math.sin(count),200 + 50*Math.cos(count));

        graphics.endFill();

        graphics.beginFill(0x00FF00,1);
        //triangle
        graphics.drawPolygon([
                400 + 50*Math.sin(count),400 + 50*Math.cos(count),
                600 + 50*Math.sin(count),400 + 50*Math.cos(count),
                500 + 50*Math.sin(count),600 + 50*Math.cos(count),
                400 + 50*Math.sin(count),400 + 50*Math.cos(count)
        ]);
        graphics.endFill();

        graphics.beginFill(0x0000FF);
        //circle
        graphics.drawCircle(300 + 50*Math.sin(count),300 + 50*Math.cos(count),50);

        graphics.endFill();
//        tilingSprite.tileScale.x = 2 + Math.sin(count);
//        tilingSprite.tileScale.y = 2 + Math.cos(count);

//        tilingSprite.tilePosition.x += 1;
//        tilingSprite.tilePosition.y += 1;

        // just for fun, lets rotate mr rabbit a little
        //stage.interactionManager.update();
        // render the stage
        renderer.render(stage);
    }
}



initialize();