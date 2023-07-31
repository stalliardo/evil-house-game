"use client";

import { useEffect, useRef, useState, useMemo } from "react";

import Prompt from "@/classes/Prompt";
import SpriteAnimation from "@/classes/SpriteAnimation";

import { dataLoader } from "../../gameUtils/levelsData";
import { useDispatch, useSelector } from "react-redux";
import { updateLevelData } from "@/features/gameState/gameStateSlice";


const Canvas = ({ ...props }) => {
    const canvas = useRef(null);


    const [ctx, setCtx] = useState(null);
    const dispatch = useDispatch();
    const levelData = useSelector((state) => state.gameState);
    const playerRef = useRef(new SpriteAnimation('allCharacters.png', 7, 4, 1, 2, { x: 200, y: 100 }, { x: 0, y: 0 }, ctx)); // cant use until ctx is set



    








    const isModalOpen = useSelector((state) => state.modal.isOpen);
    const [pauseAnimation, setPauseAnimation] = useState(false);

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

    let playerIsAtInteractableBoundary = false;
    const spriteSheet = new Image();
    spriteSheet.src = "dungeonTileset.png";

    const player = new SpriteAnimation('allCharacters.png', 7, 4, 1, 2, { x: 200, y: 100 }, { x: 0, y: 0 }, ctx);


    useEffect(() => {
        if (canvas.current) {
            setCtx(canvas.current.getContext("2d"));
            canvas.current.width = 600;
            canvas.current.height = 600;
            dispatch(updateLevelData())
        }
    }, []);

    useEffect(() => {
        let animationFrameId;

        const boundaries = [];

        levelData.map?.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (dataLoader(levelData.level, symbol, i, j, ctx) !== undefined) {
                    boundaries.push(dataLoader(levelData.level, symbol, i, j, ctx));
                }
            })
        })

        if (ctx) {
            


            const animate = () => {

                animationFrameId = requestAnimationFrame(animate);

                if(isModalOpen){
                    console.log("is modal open called");
                    cancelAnimationFrame(animationFrameId)
                }

                ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)

                // if (!isModalOpen) {
                if (keys.w.pressed && lastKey === "w") {
                    for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (boundary.hasCollision === true) {
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
                    }

                } else if (keys.a.pressed && lastKey === "a") {

                    for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (boundary.hasCollision === true) {
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
                    }
                } else if (keys.s.pressed && lastKey === "s") {
                    for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (boundary.hasCollision === true) {
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
                    }
                } else if (keys.d.pressed && lastKey === "d") {
                    for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (boundary.hasCollision === true) {
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
                }
                // }

                boundaries.forEach((boundary) => {
                    boundary.draw(spriteSheet)

                    if (boundary.hasCollision === true) {
                        if (
                            rectanglesCollide({
                                rect1: player,
                                rect2: boundary
                            })
                        ) {
                            player.velocity.x = 0;
                            player.velocity.y = 0;
                        }
                    }
                })

                player.update();
                // player.drawSprite(ctx, 100, 100);

                if (playerIsAtInteractableBoundary) {
                    const pressEPrompt = new Prompt("Press 'E'", (levelData.map[0].length * 32 / 2 - 40), (levelData.map.length * 32 / 2), canvas.current, ctx);
                    pressEPrompt.draw()
                } else {
                    if (keys.e.pressed) {
                        props.closeInteractionDisplay()
                        keys.e.pressed = false;
                    }
                }

                player.velocity.y = 0;
                player.velocity.x = 0;

                // if (!isModalOpen) {
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
                // }
            }

            ////////////////////////////

            animate();
        };
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [levelData, ctx, isModalOpen]);




    // if (isModalOpen) {
    //     console.log("Modla is opne pause the animation");
    //     setPauseAnimation(true);
    // }


    // if (ctx !== null) {


    function rectanglesCollide({ rect1, rect2 }) {
        return (
            rect1.position.y + rect1.velocity.y <= rect2.position.y + rect2.height && // top
            rect1.position.x + rect1.width + rect1.velocity.x >= rect2.position.x && // right
            rect1.position.y + rect1.height + rect1.velocity.y >= rect2.position.y && // bottom
            rect1.position.x + rect1.velocity.x <= rect2.position.x + rect2.width // left
        )
    }

    let interactedBoundary;
    function isObjectCollision(boundary) {
        if (boundary.isInteractable) {
            playerIsAtInteractableBoundary = true;
            interactedBoundary = boundary;
        }
    }

    function resetBoundaryAndInteractableBool() {
        playerIsAtInteractableBoundary = false;
        interactedBoundary = null;
    }


    addEventListener("keydown", ({ key }) => {
        switch (key) {
            case "w":
                keys.w.pressed = true;
                lastKey = "w";
                props.closeInventory();
                break;
            case "a":
                keys.a.pressed = true;
                lastKey = "a";
                player.isFacingLeft = true;
                props.closeInventory();
                break;
            case "s":
                keys.s.pressed = true;
                lastKey = "s";
                props.closeInventory();
                break;
            case "d":
                keys.d.pressed = true;
                lastKey = "d";
                player.isFacingLeft = false;
                props.closeInventory();
                break;
            case "e":
                if (playerIsAtInteractableBoundary) {
                    keys.e.pressed = true;
                    props.onInteraction(interactedBoundary);
                }
                break;
            case "i":
                if (playerIsAtInteractableBoundary) {
                    props.showInventory(interactedBoundary);
                } else {
                    props.showInventory();
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
    // }

    return (
        <div style={{ width: "fit-content" }}>
            <canvas ref={canvas}></canvas>
        </div>
    )
}

export default Canvas;