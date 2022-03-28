import { ModTexture } from "./ModTexture.js"
import { Terraria, Microsoft, System } from "./ModImports.js"

export class GlowMaskUtils {

    static loadGlowMaskTexture(name) {
        let result = -1;
        const glowMaskTexture = new ModTexture(name);
        if (glowMaskTexture.exists) {
            const newGlowMaskIndex = Terraria.GameContent.TextureAssets.GlowMask.length;
            Terraria.GameContent.TextureAssets.GlowMask = Terraria.GameContent.TextureAssets.GlowMask.cloneResized(newGlowMaskIndex + 1);
            Terraria.GameContent.TextureAssets.GlowMask[newGlowMaskIndex] = glowMaskTexture.asset.asset;
            result = newGlowMaskIndex;
        }
        return result;
    }

    static DrawNPCGlowMask (spriteBatch, npc, glowMaskIndex, screenPosition) {
        const effects = npc.direction == -1 ? Microsoft.Xna.Framework.Graphics.SpriteEffects.None : Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipHorizontally;
        let glowMaskPosition = npc.Center;
        glowMaskPosition.X -= screenPosition.X;
        glowMaskPosition.Y -= screenPosition.Y;
        glowMaskPosition.Y += npc.gfxOffY;

        let glowMaskRectangle = Terraria.Utils['Vector2 Size(Rectangle r)'](npc.frame);
        glowMaskRectangle.X /= 2;
        glowMaskRectangle.Y /= 2;

        let nullableFrame = System.Nullable.makeGeneric(Microsoft.Xna.Framework.Rectangle).new();
        nullableFrame.has_value = true;
        nullableFrame.value = npc.frame;
        spriteBatch['void Draw(Texture2D texture, Vector2 position, Nullable<Rectangle> sourceRectangle, Color color, float rotation, Vector2 origin, Vector2 scale, SpriteEffects effects, float layerDepth)']
        (Terraria.GameContent.TextureAssets.GlowMask[glowMaskIndex], glowMaskPosition, nullableFrame, Microsoft.Xna.Framework.Graphics.Color.White, npc.rotation, glowMaskRectangle, npc.scale, effects, 0);
    }
}