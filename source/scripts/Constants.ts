module Geom{
    export class Constants{
        public static TempleHpPerLevel = 3;
        public static TemplePixelsPerLevel = 10;
        public static TempleStartPixels = 25;

        public static FanaticHp = 1;
        public static FanaticStartPixels = 30;
        // 2 секунды == 120 ФПС
        public static FanaticStartShootCooldownInFPS = 240;
        public static FanaticShootCooldownReductionPerLevelInFPS = 12;


        public static HolyHpPerLevel = 5;
        public static HolyPixelsPerLevel = 5;
        public static HolyStartPixels = 10;

		public static TempleColor = ex.Color.fromHex('#653459');
		public static FanaticColor = ex.Color.fromHex('#ED1C24');
		public static HolyColor = ex.Color.fromHex('#03BAB3');
    }

}
