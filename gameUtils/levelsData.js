import Table from "@/classes/Table";
import Locker from "@/classes/Locker";
import Door from "@/classes/Door";
import Boundary from "@/classes/Boundary";
import { INTERACTION_TYPES } from "./consts";
import ChangeLevel from "@/classes/ChangeLevel";
import FloorTile from "@/classes/FloorTile";

export const dataLoader = (level, symbol, i, j, ctx) => {
    switch (level) {
        case "basement": return basement(symbol, i, j, ctx);
        case "foyer": return foyer(symbol, i, j, ctx);
    }
}

export const basement = (symbol, i, j, ctx) => {
    switch (symbol) {
        // case " ":
        //     return new FloorTile({
        //         position: {
        //             x: Boundary.width * j,
        //             y: Boundary.height * i
        //         },
                
        //     }, ctx)
        case "-":
            return new Boundary({
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
        case "lockedDoor":
            return new Door(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "basementDoorLocked",
                "basement",
                {}, ctx, true, INTERACTION_TYPES.LOCKED_DOOR, "left"
            )
        case "locker1":
           return new Locker(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "lockerLockedWithPadLock",
                "basement",
                {
                    row: 8,
                    column: 5
                }, ctx, true, INTERACTION_TYPES.LOCKED_WITH_LOOT)
            
        case "locker2":
            return new Locker(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "lockerWithNoteInShirt",
                "basement",
                {
                    row: 8,
                    column: 5
                }, ctx, false, INTERACTION_TYPES.READ_ONLY)
        case "1":
            return new Boundary({
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
        case "2":
            return new Boundary({
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
        case "3":
            return new Boundary({
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
        case "4":
            return new Boundary({
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
        case "c":
            return new Boundary({
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
        case "lw":
            return new Boundary({
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
        case "rw":
            return new Boundary({
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
        case "f":
            return new Boundary({
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
        case "s":
            return new ChangeLevel(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "changeLevelPrompt",
                "basement",
                {
                    row: 3,
                    column: 8
                }, ctx, true, INTERACTION_TYPES.CHANGE_LEVEL
            )
        case "t":
            return new Table(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "paperClipOnTable",
                "basement",
                {
                    row: 8,
                    column: 3
                }, ctx, false, INTERACTION_TYPES.SINGLE_ITEM
            )
    }
}

export const foyer = (symbol, i, j, ctx) => {
    switch (symbol) {
        case "-":
            return new Boundary({
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
        case "lockedDoor":
            return new Door(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "basementDoorLocked",
                "foyer",
                {}, ctx, true, INTERACTION_TYPES.LOCKED_DOOR, "left"
            )
        case "locker1":
           return new Locker(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "lockerLockedWithPadLock",
                "foyer",
                {
                    row: 8,
                    column: 5
                }, ctx, true, INTERACTION_TYPES.LOCKED_WITH_LOOT)
            
        case "locker2":
            return new Locker(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "lockerWithNoteInShirt",
                "foyer",
                {
                    row: 8,
                    column: 5
                }, ctx, false, INTERACTION_TYPES.READ_ONLY)
        case "1":
            return new Boundary({
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
        case "2":
            return new Boundary({
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
        case "3":
            return new Boundary({
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
        case "4":
            return new Boundary({
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
        case "c":
            return new Boundary({
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
        case "lw":
            return new Boundary({
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
        case "rw":
            return new Boundary({
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
        case "f":
            return new Boundary({
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
        case "s":
            return new ChangeLevel( // TODO
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "brokenStairs",
                "foyer",
                {
                    row: 3,
                    column: 9
                }, ctx, true, INTERACTION_TYPES.REQUIRES_ITEMS
            )
        case "t":
            return new Table(
                {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                },

                "paperClipOnTable",
                "foyer",
                {
                    row: 8,
                    column: 3
                }, ctx, false, INTERACTION_TYPES.SINGLE_ITEM
            )
    }
}