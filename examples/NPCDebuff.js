// Author: Yum (Razz#3533)

const Main = new NativeClass('Terraria', 'Main');
const Vector2 = new NativeClass('Microsoft.Xna.Framework', 'Vector2');
const Color = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color');
const SpriteBatch = new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteBatch');
const TextureAssets = new NativeClass('Terraria.GameContent', 'TextureAssets');
const Rectangle = new NativeClass('Microsoft.Xna.Framework', 'Rectangle');
const Texture2D = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Texture2D');

const Op_Subtraction = Vector2['Vector2 op_Subtraction(Vector2 value1, Vector2 value2)'];
const Draw = SpriteBatch['void Draw(Texture2D texture, Rectangle destinationRectangle, Color color)'];

const rectangle = (x, y, width, height) => {
    const rectangle = Rectangle.new();
    rectangle.X = x;
    rectangle.Y = y;
    rectangle.Width = width;
    rectangle.Height = height;

    return rectangle;
}

const drawNpcDebuffs = (npcIndex) => {
    const npc = Main.npc[npcIndex];
    const debuffs = [];

    if (npc.electrified) {
		debuffs.push(TextureAssets.Buff[144].Value);
	}
    if (npc.poisoned) {
        debuffs.push(TextureAssets.Buff[20].Value);
	}
    if (npc.onFire2) {
        debuffs.push(TextureAssets.Buff[39].Value);
	}
    if (npc.onFrostBurn) {
        debuffs.push(TextureAssets.Buff[44].Value);
	}
    if (npc.venom) {
        debuffs.push(TextureAssets.Buff[70].Value);
	}
    if (npc.shadowFlame) {
        debuffs.push(TextureAssets.Buff[153].Value);
	}
    if (npc.oiled) {
        debuffs.push(TextureAssets.Buff[204].Value);
	}
    if (npc.javelined) {
        debuffs.push(TextureAssets.Buff[169].Value);
	}
    if (npc.daybreak) {
        debuffs.push(TextureAssets.Buff[189].Value);
    }
    if (npc.celled) {
        debuffs.push(TextureAssets.Buff[183].Value);
    }
    if (npc.dryadBane) {
        debuffs.push(TextureAssets.Buff[186].Value);
    }
    if (npc.dryadWard) {
        debuffs.push(TextureAssets.Buff[165].Value);
    }
    if (npc.soulDrain && npc.realLife === -1) {
        debuffs.push(TextureAssets.Buff[151].Value);
    }
    if (npc.confused) {
        debuffs.push(TextureAssets.Buff[31].Value);
    }
    if (npc.ichor) {
        debuffs.push(TextureAssets.Buff[69].Value);
    }
    if (npc.onFire) {
		debuffs.push(TextureAssets.Buff[24].Value);
	}
    if (npc.midas) {
        debuffs.push(TextureAssets.Buff[72].Value);
	}
	if (npc.loveStruck) {
        debuffs.push(TextureAssets.Buff[119].Value);
	}
	if (npc.stinky) {
        debuffs.push(TextureAssets.Buff[120].Value);
	}
	if (npc.betsysCurse) {
        debuffs.push(TextureAssets.Buff[203].Value);
	}
	if (npc.dripping) {
        debuffs.push(TextureAssets.Buff[103].Value);
	}
	if (npc.drippingSlime) {
		debuffs.push(TextureAssets.Buff[137].Value);
	}

    const maxPerLine = 10;
    for (let k = 0; k < debuffs.length; k += maxPerLine) {
        const maxForThisLine = Math.min(maxPerLine, debuffs.length - k);
        const midpoint = maxForThisLine / 2.0;

        for (let i = 0; i < maxForThisLine; i++) {
            const num = 14.0 * Math.floor(i * 0.2);
            const drawBuffPos = Op_Subtraction(npc.Center, Main.screenPosition);
            drawBuffPos.X += 16.0 * (i - midpoint);
            drawBuffPos.Y -= TextureAssets.Npc[npc.type].Value.Bounds.Height / Main.npcFrameCount[npc.type] / 2 * npc.scale - npc.gfxOffY + 24.0 - num;

            const rect = rectangle(
                drawBuffPos.X,
                drawBuffPos.Y,
                16,
                16
            );

            Draw(Main.spriteBatch, debuffs.at(i), rect, Color.White);
        }
    }
}

Main.DrawNPC.hook((original, self, iNPCIndex, behindTiles, lightMap, lightRegion) => {
    original(self, iNPCIndex, behindTiles, lightMap, lightRegion);

    const npc = Main.npc[iNPCIndex];

    if (npc.boss) drawNpcDebuffs(iNPCIndex);
});