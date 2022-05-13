import { ModLocalization } from "./ModLocalization.js";

import { ModTexture } from "./ModTexture.js"
import { ModTexturedType } from "./ModTexturedType.js"

import { Terraria, Microsoft } from "./ModImports.js";


export class ModProjectile extends ModTexturedType { 

    static RegisteredProjectiles = [];
    static MAX_VANILLA_ID = Terraria.ID.ProjectileID.Count;

    Projectile = undefined;
    Type = undefined;

    constructor() {
        super();
    }

    SetStaticDefaults() {
        if (this.Projectile.hostile) {
            Terraria.Main.projHostile[this.Type] = true;
        }

        if (this.Projectile.aiStyle == 7) {
            Terraria.Main.projHook[this.Type] = true;
        }

    }

    SetDefaults() {}

    static register(projectile) {
        ModProjectile.RegisteredProjectiles.push(new projectile());
    }

    static InitializeRegisteredProjectiles() {
        for (let projectile of ModProjectile.RegisteredProjectiles) {
            ModProjectile.InitializeProjectile(projectile);
        }
    }

    static isModType(type) {
        return type >= ModProjectile.MAX_VANILLA_ID;
    }

    static isModProjectile(projectile) {
        return ModProjectile.isModType(projectile.type);
    }

    static getByName(name) {
        for (let projectile of ModProjectile.RegisteredProjectiles) {
            if (projectile.constructor.name === name) {
                return projectile;
            }
        }
    }

    static getTypeByName(name) {
        return ModProjectile.getByName(name).Type;
    }

    static getModProjectile(type) {
        if (ModProjectile.isModType(type)) {
            for (let projectile of ModProjectile.RegisteredProjectiles) {
                if (projectile.Type === type) {
                    return projectile;
                }
            }
        }
        return undefined;
    }

    static InitializeProjectile(projectile) {
        projectile.Projectile = {};
        
        const projectileName = projectile.constructor.name;

        projectile.Type = projectile.Projectile.type = tl.projectile.registerNew(projectileName);

        tl.log(`InitializeProjectile: ` + projectile.Type)

        Terraria.Lang._projectileNameCache[projectile.Type] = ModLocalization.getTranslationProjectileName(projectileName);

        const projectileTexture = new ModTexture(projectile.Texture);

        if (projectileTexture.exists) {
            Terraria.GameContent.TextureAssets.Projectile[projectile.Type] = projectileTexture.asset.asset;
        }
        
        projectile.SetStaticDefaults();
    }

}