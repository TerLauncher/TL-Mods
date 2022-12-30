// Author: Yum (Razz#3533)
const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');
const ChatManager = new NativeClass('Terraria.UI.Chat', 'ChatManager');
const Main = new NativeClass('Terraria', 'Main');
const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');
const Vector2 = new NativeClass('Microsoft.Xna.Framework', 'Vector2');
const NPC = new NativeClass('Terraria', 'NPC');
const Color = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color');
const FontAssets = new NativeClass('Terraria.GameContent', 'FontAssets');
const SpriteBatch = new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteBatch');
const TextureAssets = new NativeClass('Terraria.GameContent', 'TextureAssets');
const Rectangle = new NativeClass('Microsoft.Xna.Framework', 'Rectangle');
const Utils = new NativeClass('Terraria', 'Utils');

const TopLeft = Utils['Vector2 TopLeft(Rectangle r)'];
const DrawLine = Utils['void DrawLine(SpriteBatch spriteBatch, Vector2 start, Vector2 end, Color colorStart, Color colorEnd, float width)'];
const Op_Multiply = Vector2['Vector2 op_Multiply(Vector2 value, float scaleFactor)'];
const Op_Addition = Vector2['Vector2 op_Addition(Vector2 value1, Vector2 value2)'];
const Op_Subtraction = Vector2['Vector2 op_Subtraction(Vector2 value1, Vector2 value2)'];
const Distance = Vector2['float Distance(Vector2 value1, Vector2 value2)'];
const DrawString = ChatManager['void DrawColorCodedStringShadow(SpriteBatch spriteBatch, SpriteFont font, string text, Vector2 position, Color baseColor, float rotation, Vector2 origin, Vector2 baseScale, float maxWidth, float spread)'];
const Draw = SpriteBatch['void Draw(Texture2D texture, Rectangle destinationRectangle, Color color)'];
const Color_Op_Multiply = Color['Color op_Multiply(Color a, float amount)'];

const tools = {
    showPlayerPosition: false,
    showPlayerVelocity: false,
    showNpcInfo: false,
    showNpcHitbox: false,
    showProjectileHitbox: false,
}

function disableAllTools() {
    for (const tool in tools) {
        tools[tool] = false;
    }
}

function enableAllTools() {
    for (const tool in tools) {
        tools[tool] = true;
    }
}

function vector(x, y) {
    const vector = Vector2.new();
    vector.X = x;
    vector.Y = y;

    return vector;
}

function rectangle(x, y, width, height) {
    const rectangle = Rectangle.new();
    rectangle.X = x;
    rectangle.Y = y;
    rectangle.Width = width;
    rectangle.Height = height;

    return rectangle;
}

function drawPlayerPosition() {
    const font = FontAssets.ItemStack.Value;
    const player = Main.player[Main.myPlayer];
    const rect = rectangle(
        player.position.X - Main.screenPosition.X,
        player.position.Y - Main.screenPosition.Y,
        8,
        8
    );

    if (player.active) {
        Draw(Main.spriteBatch, TextureAssets.MagicPixel.Value, rect, Color.Black);
        DrawString(Main.spriteBatch, font, `position x:${player.position.X.toFixed(0)}, y:${player.position.Y.toFixed(0)}`, Op_Addition(Op_Subtraction(player.position, Main.screenPosition), vector(10.0, -20.0)), Color.White, 0.0, Vector2.Zero, vector(0.9, 0.9), -1.0, 0.0);
    }
}

function drawPlayerVelocity() {
    const font = FontAssets.ItemStack.Value;
    const player = Main.player[Main.myPlayer];
    const end = Op_Addition(player.Center, (Op_Multiply(player.velocity, 30.0)));

    if (player.active) {
        DrawString(Main.spriteBatch, font, `velocity x:${player.velocity.X.toFixed(0)}, y:${player.velocity.Y.toFixed(0)}`, Op_Addition(Op_Subtraction(player.position, Main.screenPosition), vector(10.0, -35.0)), Color.Red, 0.0, Vector2.Zero, vector(0.9, 0.9), -1.0, 0.0);
        DrawLine(Main.spriteBatch, player.Center, end, Color.Red, Color.Green, 4.0);
    }
}

function drawNpcInfo(npcIndex) {
    const font = FontAssets.ItemStack.Value;
    const npc = Main.npc[npcIndex];
    const player = Main.player[Main.myPlayer];
    const rect = rectangle(
        npc.BottomRight.X - Main.screenPosition.X,
        npc.BottomRight.Y - Main.screenPosition.Y,
        320,
        160
    );
    let x = 5.0;
    let y = 5.0;

    if (Distance(player.Center, npc.Center) < Main.screenPosition.X + npc.Center.X) {
        Draw(Main.spriteBatch, TextureAssets.MagicPixel.Value, rect, Color.NavajoWhite);

        for (let i = 0; i < 4; i++) {
            DrawString(Main.spriteBatch, font, `ai[${i}]:${npc.ai[i]}`, Op_Addition(TopLeft(rect), vector(x + i * 80, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);
        }

        y += 20.0;
        DrawString(Main.spriteBatch, font, `localAI[0]: ${npc.localAI[0]}`, Op_Addition(TopLeft(rect), vector(x, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);
        DrawString(Main.spriteBatch, font, `localAI[1]: ${npc.localAI[1]}`, Op_Addition(TopLeft(rect), vector(x + 120, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);

        y += 20.0;
        DrawString(Main.spriteBatch, font, `localAI[2]: ${npc.localAI[2]}`, Op_Addition(TopLeft(rect), vector(x, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);
        DrawString(Main.spriteBatch, font, `localAI[3]: ${npc.localAI[3]}`, Op_Addition(TopLeft(rect), vector(x + 120, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);

        y += 20.0;
        DrawString(Main.spriteBatch, font, `velocityX: ${npc.velocity.X.toFixed(0)}`, Op_Addition(TopLeft(rect), vector(x, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);
        DrawString(Main.spriteBatch, font, `velocityY: ${npc.velocity.Y.toFixed(0)}`, Op_Addition(TopLeft(rect), vector(x + 120, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);

        y += 20.0;
        DrawString(Main.spriteBatch, font, `npc.immune[]: ${npc.immune[Main.myPlayer]}`, Op_Addition(TopLeft(rect), vector(x, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);
        DrawString(Main.spriteBatch, font, `direction: ${npc.direction}`, Op_Addition(TopLeft(rect), vector(x + 110, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);

        y += 20.0;
        DrawString(Main.spriteBatch, font, `type: ${npc.type}  aiStyle: ${npc.aiStyle}  whoAmI: ${npc.whoAmI}`, Op_Addition(TopLeft(rect), vector(x, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);

        y += 20.0;
        DrawString(Main.spriteBatch, font, `lifeMax: ${npc.lifeMax}  defense: ${npc.defense}  damage: ${npc.damage}`, Op_Addition(TopLeft(rect), vector(x, y)), Color.Black, 0.0, Vector2.Zero, vector(0.8, 0.8), -1.0, 0.0);
    }
}

function drawNpcHitbox(npcIndex) {
    const npc = Main.npc[npcIndex];
    const player = Main.player[Main.myPlayer];
    const hitbox = rectangle(
        npc.position.X - Main.screenPosition.X,
        npc.position.Y - Main.screenPosition.Y,
        npc.width,
        npc.height
    );

    if (Distance(player.Center, npc.Center) < Main.screenPosition.X + npc.Center.X && npc.active) {
        Draw(Main.spriteBatch, TextureAssets.MagicPixel.Value, hitbox, Color_Op_Multiply(Color.Red, 0.6));
    }
}

function drawProjectileDamageHitbox() {
    for (let i = 0; i < 1000; i++) {
        const projectile = Main.projectile[i];

        if (projectile.active) {
            const hitbox = rectangle(
                projectile.position.X - Main.screenPosition.X,
                projectile.position.Y - Main.screenPosition.Y,
                projectile.width,
                projectile.height
            );

            Draw(Main.spriteBatch, TextureAssets.MagicPixel.Value, hitbox, Color_Op_Multiply(Color.OrangeRed, 0.6));
        }
    }
}

// !TODO: Find another safely hook
Main.DrawRain.hook((original, self) => {
    original(self);

    if (tools.showPlayerPosition) drawPlayerPosition();
    if (tools.showPlayerVelocity) drawPlayerVelocity();
    if (tools.showProjectileHitbox) drawProjectileDamageHitbox();
});

Main.DrawNPC.hook((original, self, iNPCIndex, behindTiles, lightMap, lightRegion) => {
    original(self, iNPCIndex, behindTiles, lightMap, lightRegion);

    if (tools.showNpcInfo) drawNpcInfo(iNPCIndex);
    if (tools.showNpcHitbox) drawNpcHitbox(iNPCIndex);
});

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
    original(self, message, client_id);

    const command = message.Text;
    const isRussian = GameCulture.FromCultureName(GameCulture.CultureName.Russian)
        .IsActive;

    const enabledText = isRussian ? 'включено' : 'enabled';
    const disabledText = isRussian ? 'отключено' : 'disabled';

    if (command.startsWith('/tool ')) {
        const tool = command.substring(6);

        let textToShow = ""

        switch (tool) {
            case '1': {
                tools.showPlayerPosition = !tools.showPlayerPosition;
                const info = isRussian ? 'Отображение информации о положении игрока было' : 'Player position info display has been';
                textToShow = `${info} ${tools.showPlayerPosition ? enabledText : disabledText}`
                break;
            }
            case '2': {
                tools.showPlayerVelocity = !tools.showPlayerVelocity;
                const info = isRussian ? 'Отображение информации об ускорении игрока было' : 'Player velocity info display has been';
                textToShow = `${info} ${tools.showPlayerVelocity ? enabledText : disabledText}`;
                break;
            }
            case '3': {
                tools.showNpcInfo = !tools.showNpcInfo;
                const info = isRussian ? 'Отображение информации о НИПах было' : 'NPCs info display has been';
                textToShow = `${info} ${tools.showNpcInfo ? enabledText : disabledText}`;
                break;
            }
            case '4': {
                tools.showNpcHitbox = !tools.showNpcHitbox;
                const info = isRussian ? 'Отображение хитбоксов НИПов было' : 'NPC hitboxes display has been';
                textToShow = `${info} ${tools.showNpcHitbox ? enabledText : disabledText}`;
                break;
            }
            case '5': {
                tools.showProjectileHitbox = !tools.showProjectileHitbox;
                const info = isRussian ? 'Отображение хитбоксов снарядов было' : 'Projectile hitboxes display has been';
                textToShow = `${info} ${tools.showProjectileHitbox ? enabledText : disabledText}`;
                break;
            }
            case '0': {
                const someToolsEnabled = Object.getOwnPropertyNames(tools)
                    .some((key) => tools[key]);

                let statusText = "";

                if (someToolsEnabled) {
                    disableAllTools();
                    statusText = isRussian ? 'отключены' : 'disabled';
                } else {
                    enableAllTools();
                    statusText = isRussian ? 'включены' : 'enabled';
                }

                textToShow = `${isRussian ? 'Все инструменты были' : 'All tools have been'} ${statusText}`;

                break;
            }
        }

        if (textToShow !== "") {
            Main.NewText(textToShow, 200, 100, 100);
        }
    }
});