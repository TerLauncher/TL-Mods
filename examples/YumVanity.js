// Author: Yum (Razz#3533)

const Main = new NativeClass('Terraria', 'Main');
const Player = new NativeClass('Terraria', 'Player');
const Dust = new NativeClass('Terraria', 'Dust');
const Vector2 = new NativeClass('Microsoft.Xna.Framework', 'Vector2');
const Color = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color');
const GameShaders = new NativeClass('Terraria.Graphics.Shaders', 'GameShaders');
const ArmorShaderDataSet = new NativeClass('Terraria.Graphics.Shaders', 'ArmorShaderDataSet');

const GetSecondaryShader = ArmorShaderDataSet['ArmorShaderData GetSecondaryShader(int id, Player player)'];
const VectorMultiply = Vector2['Vector2 op_Multiply(Vector2 value, float scaleFactor)'];
const SetArmorEffectVisuals = Player['void SetArmorEffectVisuals(Player drawPlayer)'];
const NewDust = Dust['int NewDust(Vector2 Position, int Width, int Height, int Type, float SpeedX, float SpeedY, int Alpha, Color newColor, float Scale)'];

SetArmorEffectVisuals.hook((original, self, drawPlayer) => {
	original(self, drawPlayer);

	if (drawPlayer.head == 193 && drawPlayer.body == 194 && drawPlayer.legs == 134) {
		self.armorEffectDrawShadowSubtle = false;
		self.armorEffectDrawShadowLokis = false;
		self.armorEffectDrawOutlines = false;

		const newColor = Color.new();

		const rightLegDust = drawPlayer.position;
		rightLegDust.X = rightLegDust.X + drawPlayer.width;
		rightLegDust.Y = rightLegDust.Y + drawPlayer.height;

		const leftLegDust = drawPlayer.position;
		leftLegDust.X = leftLegDust.X + drawPlayer.width / 4;
		leftLegDust.Y = leftLegDust.Y + drawPlayer.height;

		if (drawPlayer.velocity.X != 0.0) {
			let num = NewDust(drawPlayer.Center, drawPlayer.width, 0, 222, 0.0, 0.0, 0, newColor, 0.4);
			Main.dust[num].shader = GameShaders.Armor.GetSecondaryShader(15, Main.LocalPlayer);
			Main.dust[num].noGravity = true;
			Main.dust[num].velocity = VectorMultiply(Main.dust[num].velocity, 0.0);
			Main.dust[num].position = rightLegDust;

			num = NewDust(drawPlayer.Center, drawPlayer.width, 0, 222, 0.0, 0.0, 0, newColor, 0.4);
			Main.dust[num].noGravity = true;
			Main.dust[num].velocity = VectorMultiply(Main.dust[num].velocity, 0.0);
			Main.dust[num].position = leftLegDust;
		}
	}
});