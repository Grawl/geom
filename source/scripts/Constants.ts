module Geom{
    export class Constants{
        public static TempleHpPerLevel = 3;
        public static TemplePixelsPerLevel = 10;
        public static TempleStartPixels = 25;

        public static FanaticHp = 1;
        public static FanaticStartPixels = 30;
        public static FanaticPixelsPerLevel = 30;
        // 2 секунды == 120 ФПС
        public static FanaticStartShootCooldownInFPS = 240;
        public static FanaticShootCooldownReductionPerLevelInFPS = 12;


        public static HolyHpPerLevel = 5;
        public static HolyPixelsPerLevel = 5;
        public static HolyStartPixels = 10;

		public static TempleColor = ex.Color.fromHex('#653459');
		public static FanaticColor = ex.Color.fromHex('#ED1C24');
		public static HolyColor = ex.Color.fromHex('#03BAB3');

		public static AtheistColor = ex.Color.fromHex('#FF00FF');

        public static TempleFaithCost = 30;
        public static FanaticFaithCost = 15;
        public static HolyFaithCost = 60;

		public static TempleFaithUpgradeCost = Constants.TempleFaithCost * 4;
		public static FanaticFaithUpgradeCost = Constants.FanaticFaithCost * 4;
		public static HolyFaithUpgradeCost = Constants.HolyFaithCost * 4;

        public static StartFaith = 45;

        public static TempleCooldown = 120;
        public static HolyCooldown = 180;

        public static MaxAtheistSpeed = 300;

        public static MaxAtheistSize = 50;

        public static AtheistBaseCooldown = 200;

        public static TempleWeight = 30;
        public static FanaticWeight = 10;
        public static HolyWeight = 50;

        public static FanaticShootSpeed = 300;
    }


    export enum HolyObjects{
        Temple = 0,
        Fanatic = 1,
        Holy = 2
    }
}
