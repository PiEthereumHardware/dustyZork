// ZORK-inspired surface zone (5x5) for new player spawns

export interface ZorkRoom {
  name: string;
  description: string;
  items?: string[];
  puzzle?: {
    prompt: string;
    solution: string;
    reward?: string;
  };
  flavor?: string;
}

export function generateZorkSurfaceZone(centerX: number, centerY: number, centerZ: number): ZorkRoom[][] {
  // Example: Construct a 5x5 zone centered on (centerX, centerZ)
  // Surface region ONLY (centerY)

  const roomNames = [
    "West of House", "South Path", "Clearing", "Forest Edge", "Garden",
    "Kitchen Window", "Grue's Haunt", "Treasure Nook", "Mossy Meadow", "Twisted Tree",
    "Rocky Path", "Locked Cellar", "Stone Plaza", "Shimmering Pond", "Windy Bluff",
    "East Porch", "Rusty Well", "Cyclops Field", "Worn Monument", "Dusty Alcove",
    "North Gate", "Sunken Idol", "Starlit Patch", "Hidden Grove", "Empty Crossroads"
  ];

  const itemsByRoom = [
    ["lamp"], ["rusty key"], [], ["sword"], [],
    ["loaf of bread"], ["mysterious note"], ["zorkmid"], [], ["tree branch"],
    [], ["cellar door"], [], ["pond rock"], ["old rope"],
    ["porch coin"], ["bucket"], ["giant footprint"], [], ["ancient coin"],
    [], ["idol fragment"], [], ["old boots"], []
  ];

  const puzzlesByRoom = [
    null,
    {
      prompt: "A locked gate bars passage south. What might open it?",
      solution: "rusty key",
      reward: "You unlock the gate with the rusty key!"
    },
    null,
    {
      prompt: "A sword is wedged in a twisted tree. Free it?",
      solution: "pull sword",
      reward: "The sword slips free! You gain the sword."
    },
    null,
    null,
    {
      prompt: "A note reads: 'Say the magic word...',",
      solution: "xyzzy",
      reward: "A hidden compartment opens, revealing a zorkmid!"
    },
    null,
    null,
    null,
    null,
    {
      prompt: "A cellar door is locked. Something might fit?",
      solution: "rusty key",
      reward: "The cellar opens! Adventure deeper?"
    },
    null,
    null,
    null,
    null,
    null,
    {
      prompt: "A giant footprint presses into the earth. What made it?",
      solution: "cyclops",
      reward: "You hear a distant roar—be wary!"
    },
    null,
    null,
    {
      prompt: "A fragment fits into the sunken idol. Fix it?",
      solution: "insert fragment",
      reward: "The idol glows faintly."
    },
    null,
    null,
  ];

  // 5x5 grid, fill with room data
  const zone: ZorkRoom[][] = [];
  let idx = 0;

  for (let dz = -2; dz <= 2; dz++) {
    const row: ZorkRoom[] = [];
    for (let dx = -2; dx <= 2; dx++) {
      row.push({
        name: roomNames[idx],
        description: `You are at ${roomNames[idx]}.`,
        items: itemsByRoom[idx],
        puzzle: puzzlesByRoom[idx],
        flavor: puzzlesByRoom[idx]?.prompt,
      });
      idx++;
    }
    zone.push(row);
  }
  return zone;
}

// Utility: Get room data for (localX, localZ) offset within zone
export function getSurfaceZorkRoom(zone: ZorkRoom[][], localX: number, localZ: number): ZorkRoom | undefined {
  // localX, localZ are offsets from center (-2..2)
  const row = zone[localZ + 2];
  return row ? row[localX + 2] : undefined;
}