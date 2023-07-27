"use client";

import { useEffect, useRef, useState } from "react";
import Boundary from "@/classes/Boundary";
import map from "../../gameUtils/map";
import Player from "@/classes/Player";
import CanvasText from "@/classes/CanvasText";
import Prompt from "@/classes/Prompt";
import { BOUNDARY_TYPES } from "../../gameUtils/consts";
import SpriteAnimation from "@/classes/SpriteAnimation";
import { BASEMENT_NOTES } from "../../gameUtils/gameTextConsts";
import { addItemToInventory, isItemInInventory } from "../../gameUtils/localStorageUtils";

const Canvas = ({ ...props }) => {
    const canvas = useRef();
    const [ctx, setCtx] = useState(null);



    useEffect(() => {
        if (canvas.current) {
            setCtx(canvas.current.getContext("2d"));
            canvas.current.width = 600;
            canvas.current.height = 600;
        }

    }, [])

    if (ctx !== null) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        const keys = {
            w: {
                pressed: false
            },
            a: {
                pressed: false
            },
            s: {
                pressed: false
            },
            d: {
                pressed: false
            },
            e: {
                pressed: false
            }
        }

        let lastKey = "";

        // Spawn the plaer in the bottom right corner
        // const player = new Player({ position: { x: 80, y: Boundary.height * map.length - Boundary.height * 3 }, velocity: { x: 0, y: 0 }, ctx, spriteSheetCoords: {row: 2, column: 1} })

        // const stairsText = new CanvasText("Stairs", "24px Arial", "red", 48, 100, ctx);

        // const b = new Boundary({position: {x: 10, y: 10,}, ctx: ctx});
        // b.draw()

        const boundaries = [];
        let playerIsAtInteractableBoundary = false;

        ///// tile Extraction from dungeonTileset.png
        const spriteSheet = new Image();
        spriteSheet.src = "dungeonTileset.png"

        // player animation
        const player = new SpriteAnimation('allCharacters.png', 7, 4, 1, 2, { x: 200, y: 100 }, { x: 0, y: 0 }, ctx);

        // function drawTile(x, y) {

        // }

        //  .log("tileWidth = ", tileWidth);


        map.forEach((row, i) => {
            row.forEach((symbol, j) => {
                switch (symbol) {
                    case "-":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 0,
                                    column: 2
                                }

                            })
                        )
                        break;

                    case "ldl":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                colour: "red",
                                interactionData: {
                                    boundaryType: BOUNDARY_TYPES.lOCKER,
                                    text: "The door is locked! Maybe there is a key around here somewhere."
                                },
                                spriteSheetCoords: {
                                    row: 6,
                                    column: 6
                                }
                            })

                        )
                        break;
                    case "ldr":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                colour: "red",
                                interactionData: {
                                    boundaryType: BOUNDARY_TYPES.lOCKER,
                                    text: "The door is locked! Maybe there is a key around here somewhere."
                                },
                                spriteSheetCoords: {
                                    row: 6,
                                    column: 7
                                }
                            })
                        )
                        break;
                    case "locker1":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                interactionData: {
                                    boundaryType: BOUNDARY_TYPES.lOCKER,
                                    // conditional text based on wheter the user has picked up the key
                                    text: BASEMENT_NOTES.LOCKED_LOCKER_NO_PAPER_CLIP
                                },
                                spriteSheetCoords: {
                                    row: 8,
                                    column: 5
                                }
                            })
                        )
                        break;
                    case "locker2":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                interactionData: {
                                    boundaryType: BOUNDARY_TYPES.lOCKER,
                                    text: BASEMENT_NOTES.LOCKER_WITH_SHIRT,
                                    interactionOptions: ["Read"],
                                    callbacks: [
                                        {
                                            type: "Read",
                                            action: () => BASEMENT_NOTES.NOTE_1
                                        }
                                    ]
                                },
                                spriteSheetCoords: {
                                    row: 8,
                                    column: 5
                                }
                            })
                        )
                        break;
                    case "1":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 0,
                                    column: 0
                                }
                            })
                        )
                        break;
                    case "2":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 0,
                                    column: 5
                                }
                            })
                        )
                        break;
                    case "3":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 4,
                                    column: 0
                                }
                            })
                        )
                        break;
                    case "4":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 4,
                                    column: 5
                                }
                            })
                        )
                        break;
                    case "c":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 0,
                                    column: 1
                                }
                            })
                        )
                        break;
                    case "lw":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 1,
                                    column: 0
                                }
                            })
                        )
                        break;
                    case "rw":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 1,
                                    column: 5
                                }
                            })
                        )
                        break;
                    case "f":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 4,
                                    column: 2
                                }
                            })
                        )
                        break;
                    case "s":
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                ctx,
                                spriteSheetCoords: {
                                    row: 3,
                                    column: 9
                                }
                            })
                        )
                        break;
                        case "t":
                            boundaries.push(
                                new Boundary({
                                    position: {
                                        x: Boundary.width * j,
                                        y: Boundary.height * i
                                    },
                                    ctx,
                                    interactionData: {
                                        boundaryType: BOUNDARY_TYPES.TABLE,
                                        text: [BASEMENT_NOTES.TABLE_TEXT_HAS_CLIP_IN_INV, BASEMENT_NOTES.TABLE_TEXT, "Paper Clip"],
                                        interactionOptions: ["Take", "Leave"],
                                        callbacks: [
                                            {
                                                type: "Take",
                                                action: [() => addItemToInventory({name: "Paper Clip", matrixName: "basementPaperClip"}), "You have taken the paper clip"]
                                            },
                                            {
                                                type: "Leave",
                                                action: () => "You have decided to leave the paper clip"
                                            },

                                        ]
                                    },
                                    spriteSheetCoords: {
                                        row: 8,
                                        column: 3
                                    }
                                })
                            )
                            break;

                    default:
                    // boundaries.push(
                    //     new Boundary({
                    //         position: {
                    //             x: Boundary.width * j,
                    //             y: Boundary.height * i
                    //         },
                    //         ctx,
                    //         spriteSheetCoords: {
                    //             row: 6,
                    //             column: 3
                    //         }
                    //     })
                    // )


                }
            })
        })

        function rectanglesCollide({
            rect1,
            rect2
        }) {
            return (
                rect1.position.y + rect1.velocity.y <= rect2.position.y + rect2.height && // top
                rect1.position.x + rect1.width + rect1.velocity.x >= rect2.position.x && // right
                rect1.position.y + rect1.height + rect1.velocity.y >= rect2.position.y && // bottom
                rect1.position.x + rect1.velocity.x <= rect2.position.x + rect2.width // left
            )
        }

        let interactedBoundary;
        function isObjectCollision(boundary) {

            // Check if the boundaryType is an iteractable boundary
            if (Object.values(BOUNDARY_TYPES).includes(boundary.interactionData.boundaryType)) {
                playerIsAtInteractableBoundary = true;
                interactedBoundary = boundary;

            }
        }

        function resetBoundaryAndInteractableBool() {
            playerIsAtInteractableBoundary = false;
            interactedBoundary = null;
        }

        function animate() { // creates the animation loop
            requestAnimationFrame(animate);



            // player animation / not currently in use
            // player.updateFrame();

            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)

            if (keys.w.pressed && lastKey === "w") {
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (rectanglesCollide({
                        rect1: { ...player, velocity: { x: 0, y: -5 } },
                        rect2: boundary
                    })) {
                        player.velocity.y = 0;
                        isObjectCollision(boundary);

                        break;
                    } else {
                        resetBoundaryAndInteractableBool();
                        player.velocity.y = -5;
                    }
                }

            } else if (keys.a.pressed && lastKey === "a") {

                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (rectanglesCollide({
                        rect1: { ...player, velocity: { x: -5, y: 0 } },
                        rect2: boundary
                    })) {
                        player.velocity.x = 0;
                        isObjectCollision(boundary);
                        break;
                    } else {
                        player.velocity.x = -5;
                        resetBoundaryAndInteractableBool();

                    }
                }
            } else if (keys.s.pressed && lastKey === "s") {
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (rectanglesCollide({
                        rect1: { ...player, velocity: { x: 0, y: 5 } },
                        rect2: boundary
                    })) {
                        player.velocity.y = 0;
                        isObjectCollision(boundary);
                        break;
                    } else {
                        player.velocity.y = +5;
                        resetBoundaryAndInteractableBool();

                    }
                }
            } else if (keys.d.pressed && lastKey === "d") {
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (rectanglesCollide({
                        rect1: { ...player, velocity: { x: 5, y: 0 } },
                        rect2: boundary
                    })) {
                        player.velocity.x = 0;
                        isObjectCollision(boundary);
                        break;
                    } else {
                        player.velocity.x = 5;
                        resetBoundaryAndInteractableBool();

                    }
                }
            }

            boundaries.forEach((boundary) => {
                boundary.draw(spriteSheet)

                if (
                    rectanglesCollide({
                        rect1: player,
                        rect2: boundary
                    })
                ) {
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                }
            })

            player.update();
            // stairsText.draw();


            player.drawSprite(ctx, 100, 100);




            if (playerIsAtInteractableBoundary) {
                const pressEPrompt = new Prompt("Press 'E'", (map[0].length * 32 / 2 - 40), (map.length * 32 / 2), canvas.current, ctx);
                pressEPrompt.draw()
            } else {
                // check in here if a onInteraction action has been fired
                // if so then sendAn closeInteraction functio or something

                if (keys.e.pressed) {
                    // they just pressed e and have now moved, so fire an action to close the gameDataDisplay text
                    props.closeInteractionDisplay()
                    keys.e.pressed = false;
                }
            }



            player.velocity.y = 0;
            player.velocity.x = 0;

            if (keys.w.pressed && lastKey === "w") {
                player.velocity.y = -5;
            } else if (keys.a.pressed && lastKey === "a") {
                player.velocity.x = -5;
                player.setDirection("left");
            } else if (keys.s.pressed && lastKey === "s") {
                player.velocity.y = +5;
            } else if (keys.d.pressed && lastKey === "d") {
                player.velocity.x = +5;
                player.setDirection("right");
            }



        }

        animate();

        addEventListener("keydown", ({ key }) => {
            switch (key) {
                case "w":
                    keys.w.pressed = true;
                    lastKey = "w";
                    break;
                case "a":
                    keys.a.pressed = true;
                    lastKey = "a";
                    player.isFacingLeft = true;
                    break;
                case "s":
                    keys.s.pressed = true;
                    lastKey = "s";
                    break;
                case "d":
                    keys.d.pressed = true;
                    lastKey = "d";
                    player.isFacingLeft = false;
                    break;
                case "e":
                    if (playerIsAtInteractableBoundary) {
                        keys.e.pressed = true;
                        props.onInteraction(interactedBoundary);
                    }

                    break;
            }
        })

        addEventListener("keyup", ({ key }) => {
            switch (key) {
                case "w":
                    keys.w.pressed = false;
                    break;
                case "a":
                    keys.a.pressed = false;
                    break;
                case "s":
                    keys.s.pressed = false;
                    break;
                case "d":
                    keys.d.pressed = false;
                    break;
            }
        })

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }



    return (
        <div style={{ width: "fit-content" }}>
            <canvas ref={canvas}></canvas>
        </div>
    )
}

export default Canvas































// v1 below


// "use client";

// import { useEffect, useRef, useState } from "react";
// import Boundary from "@/classes/Boundary";
// import map from "../../gameUtils/map";
// import Player from "@/classes/Player";
// import CanvasText from "@/classes/CanvasText";
// import Prompt from "@/classes/Prompt";
// import { BOUNDARY_TYPES } from "../../gameUtils/consts";
// import SpriteAnimation from "@/classes/SpriteAnimation";

// const Canvas = ({ ...props }) => {
//     const canvas = useRef();
//     const [ctx, setCtx] = useState(null);



//     useEffect(() => {
//         if (canvas.current) {
//             setCtx(canvas.current.getContext("2d"));
//             canvas.current.width = 600;
//             canvas.current.height = 600;
//         }

//     }, [])

//     if (ctx !== null) {
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//         const keys = {
//             w: {
//                 pressed: false
//             },
//             a: {
//                 pressed: false
//             },
//             s: {
//                 pressed: false
//             },
//             d: {
//                 pressed: false
//             }
//         }

//         let lastKey = "";

//         // Spawn the plaer in the bottom right corner
//         const player = new Player({ position: { x: 80, y: Boundary.height * map.length - Boundary.height * 3 }, velocity: { x: 0, y: 0 }, ctx, spriteSheetCoords: {row: 2, column: 1} })

//         const stairsText = new CanvasText("Stairs", "24px Arial", "red", 48, 100, ctx);

//         // const b = new Boundary({position: {x: 10, y: 10,}, ctx: ctx});
//         // b.draw()

//         const boundaries = [];
//         let playerIsAtInteractableBoundary = false;


//         ///// tile Extraction from dungeonTileset.png
//         const spriteSheet = new Image();
//         spriteSheet.src = "dungeonTileset.png"

//         // player animation
//         const playerAnimation = new SpriteAnimation('dungeonCharacters.png', 7, 2, 1, 4, {x: 200, y: 100}, {x: 0, y: 0}, ctx);

//         // function drawTile(x, y) {

//         // }

//         // console.log("tileWidth = ", tileWidth);


//         map.forEach((row, i) => {
//             row.forEach((symbol, j) => {
//                 switch (symbol) {
//                     case "-":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 0,
//                                     column: 2
//                                 }

//                             })
//                         )
//                         break;

//                     case "ldl":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 colour: "red",
//                                 interactionData: {
//                                     boundaryType: BOUNDARY_TYPES.lOCKER,
//                                     text: "The door is locked! Maybe there is a key around here somewhere."
//                                 },
//                                 spriteSheetCoords: {
//                                     row: 6,
//                                     column: 6
//                                 }
//                             })

//                         )
//                         break;
//                     case "ldr":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 colour: "red",
//                                 interactionData: {
//                                     boundaryType: BOUNDARY_TYPES.lOCKER,
//                                     text: "The door is locked! Maybe there is a key around here somewhere."
//                                 },
//                                 spriteSheetCoords: {
//                                     row: 6,
//                                     column: 7
//                                 }
//                             })
//                         )
//                         break;
//                     case "locker1":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 interactionData: {
//                                     boundaryType: BOUNDARY_TYPES.lOCKER,
//                                     text: "You opened the locker. There isn't anything useful inside."
//                                 },
//                                 spriteSheetCoords: {
//                                     row: 8,
//                                     column: 5
//                                 }
//                             })
//                         )
//                         break;
//                     case "locker2":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 colour: "blue",
//                                 interactionData: {
//                                     boundaryType: BOUNDARY_TYPES.lOCKER,
//                                     text: "You opened the locker. Now, this is interesting. There's an old shirt hanging inside. A piece of paper is hanging out the top of one of the pockets. What will you do?",
//                                     interactionOptions: ["Leave", "Read", "Take"]
//                                 },
//                                 spriteSheetCoords: {
//                                     row: 8,
//                                     column: 5
//                                 }
//                             })
//                         )
//                         break;
//                     case "1":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 0,
//                                     column: 0
//                                 }
//                             })
//                         )
//                         break;
//                     case "2":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 0,
//                                     column: 5
//                                 }
//                             })
//                         )
//                         break;
//                     case "3":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 4,
//                                     column: 0
//                                 }
//                             })
//                         )
//                         break;
//                     case "4":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 4,
//                                     column: 5
//                                 }
//                             })
//                         )
//                         break;
//                     case "c":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 0,
//                                     column: 1
//                                 }
//                             })
//                         )
//                         break;
//                     case "lw":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 1,
//                                     column: 0
//                                 }
//                             })
//                         )
//                         break;
//                     case "rw":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 1,
//                                     column: 5
//                                 }
//                             })
//                         )
//                         break;
//                     case "f":
//                         boundaries.push(
//                             new Boundary({
//                                 position: {
//                                     x: Boundary.width * j,
//                                     y: Boundary.height * i
//                                 },
//                                 ctx,
//                                 spriteSheetCoords: {
//                                     row: 4,
//                                     column: 2
//                                 }
//                             })
//                         )
//                         break;

//                     default:
//                         // boundaries.push(
//                         //     new Boundary({
//                         //         position: {
//                         //             x: Boundary.width * j,
//                         //             y: Boundary.height * i
//                         //         },
//                         //         ctx,
//                         //         spriteSheetCoords: {
//                         //             row: 6,
//                         //             column: 3
//                         //         }
//                         //     })
//                         // )


//                 }
//             })
//         })

//         function rectanglesCollide({
//             rect1,
//             rect2
//         }) {
//             return (
//                 rect1.position.y + rect1.velocity.y <= rect2.position.y + rect2.height && // top
//                 rect1.position.x + rect1.width + rect1.velocity.x >= rect2.position.x && // right
//                 rect1.position.y + rect1.height + rect1.velocity.y >= rect2.position.y && // bottom
//                 rect1.position.x + rect1.velocity.x <= rect2.position.x + rect2.width // left
//             )
//         }


//         let interactedBoundary;
//         function isObjectCollision(boundary) {

//             // Potential collisions =
//             // door
//             // locker
//             // table
//             // bed
//             // drawer
//             // toolbox



//             // Check if the boundaryType is an iteractable boundary
//             if (Object.values(BOUNDARY_TYPES).includes(boundary.interactionData.boundaryType)) {
//                 playerIsAtInteractableBoundary = true;

//                 interactedBoundary = boundary;

//             }
//         }

//         function resetBoundaryAndInteractableBool() {
//             playerIsAtInteractableBoundary = false;
//             interactedBoundary = null;
//         }



//         function animate() { // creates the animation loop
//             requestAnimationFrame(animate);

//             // player animation
//             playerAnimation.updateFrame();

//             ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)

//             if (keys.w.pressed && lastKey === "w") {
//                 for (let i = 0; i < boundaries.length; i++) {
//                     const boundary = boundaries[i];
//                     if (rectanglesCollide({
//                         rect1: { ...player, velocity: { x: 0, y: -5 } },
//                         rect2: boundary
//                     })) {
//                         player.velocity.y = 0;
//                         isObjectCollision(boundary);

//                         break;
//                     } else {
//                         resetBoundaryAndInteractableBool();
//                         player.velocity.y = -5;
//                     }
//                 }

//             } else if (keys.a.pressed && lastKey === "a") {

//                 for (let i = 0; i < boundaries.length; i++) {
//                     const boundary = boundaries[i];
//                     if (rectanglesCollide({
//                         rect1: { ...player, velocity: { x: -5, y: 0 } },
//                         rect2: boundary
//                     })) {
//                         player.velocity.x = 0;
//                         isObjectCollision(boundary);
//                         break;
//                     } else {
//                         player.velocity.x = -5;
//                         resetBoundaryAndInteractableBool();

//                     }
//                 }
//             } else if (keys.s.pressed && lastKey === "s") {
//                 for (let i = 0; i < boundaries.length; i++) {
//                     const boundary = boundaries[i];
//                     if (rectanglesCollide({
//                         rect1: { ...player, velocity: { x: 0, y: 5 } },
//                         rect2: boundary
//                     })) {
//                         player.velocity.y = 0;
//                         isObjectCollision(boundary);
//                         break;
//                     } else {
//                         player.velocity.y = +5;
//                         resetBoundaryAndInteractableBool();

//                     }
//                 }
//             } else if (keys.d.pressed && lastKey === "d") {
//                 for (let i = 0; i < boundaries.length; i++) {
//                     const boundary = boundaries[i];
//                     if (rectanglesCollide({
//                         rect1: { ...player, velocity: { x: 5, y: 0 } },
//                         rect2: boundary
//                     })) {
//                         player.velocity.x = 0;
//                         isObjectCollision(boundary);
//                         break;
//                     } else {
//                         player.velocity.x = 5;
//                         resetBoundaryAndInteractableBool();

//                     }
//                 }
//             }

//             boundaries.forEach((boundary) => {
//                 boundary.draw(spriteSheet)

//                 if (
//                     rectanglesCollide({
//                         rect1: player,
//                         rect2: boundary
//                     })
//                 ) {
//                     player.velocity.x = 0;
//                     player.velocity.y = 0;
//                 }
//             })

//             player.update();
//             stairsText.draw();


//             playerAnimation.drawSprite(ctx, 100, 100);




//             if (playerIsAtInteractableBoundary) {
//                 const pressEPrompt = new Prompt("Press 'E'", (map[0].length * 40 / 2 - 20), (map.length * 40 / 2), canvas.current, ctx);
//                 pressEPrompt.draw()
//             }



//             player.velocity.y = 0;
//             player.velocity.x = 0;

//             if (keys.w.pressed && lastKey === "w") {
//                 player.velocity.y = -5;
//             } else if (keys.a.pressed && lastKey === "a") {
//                 player.velocity.x = -5;
//             } else if (keys.s.pressed && lastKey === "s") {
//                 player.velocity.y = +5;
//             } else if (keys.d.pressed && lastKey === "d") {
//                 player.velocity.x = +5;
//             }



//         }

//         animate();

//         addEventListener("keydown", ({ key }) => {
//             switch (key) {
//                 case "w":
//                     keys.w.pressed = true;
//                     lastKey = "w";
//                     break;
//                 case "a":
//                     keys.a.pressed = true;
//                     lastKey = "a";
//                     playerAnimation.isFacingLeft = true;
//                     break;
//                 case "s":
//                     keys.s.pressed = true;
//                     lastKey = "s";
//                     break;
//                 case "d":
//                     keys.d.pressed = true;
//                     lastKey = "d";
//                     playerAnimation.isFacingLeft = false;
//                     break;
//                 case "e":
//                     // keys.d.pressed = true;
//                     // fire a function to be triggered in parent

//                     // now need to determine what boundary we are at ie door or locker and handle logic from there


//                     // examples:

//                     // 1 - the door is locked
//                     // 2 - The lcoker is locked
//                     // 3 - There is a knife on the table, what will you do?






//                     // props.onDoorInteraction("The door is locked! Maybe there is a key around here somewhere.");
//                     // props.onLockerInteraction("The door is locked! Maybe there is a key around here somewhere.");
//                     // props.onDrawrInteraction("The door is locked! Maybe there is a key around here somewhere.");
//                     // props.onTableInteraction("The is a table here. Some old junk lays on the table, some newspapers a lamp and a box. What will you do?");

//                     // bettter method

//                     if (playerIsAtInteractableBoundary) {
//                         props.onInteraction(interactedBoundary);
//                     }
//                     // this can then pass in all the strings and objects ect needed



//                     break;
//             }
//         })

//         addEventListener("keyup", ({ key }) => {
//             switch (key) {
//                 case "w":
//                     keys.w.pressed = false;
//                     break;
//                 case "a":
//                     keys.a.pressed = false;
//                     break;
//                 case "s":
//                     keys.s.pressed = false;
//                     break;
//                 case "d":
//                     keys.d.pressed = false;
//                     break;
//             }
//         })




//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     }



//     return (
//         <div style={{ width: "fit-content" }}>
//             <canvas ref={canvas}></canvas>
//         </div>
//     )
// }

// export default Canvas