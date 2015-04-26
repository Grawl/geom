var Geom;
(function (Geom) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.TempleHpPerLevel = 3;
        Constants.TemplePixelsPerLevel = 10;
        Constants.TempleStartPixels = 25;
        Constants.FanaticHp = 1;
        Constants.FanaticStartPixels = 30;
        Constants.FanaticPixelsPerLevel = 5;
        // 2 секунды == 120 ФПС
        Constants.FanaticStartShootCooldownInFPS = 240;
        Constants.FanaticShootCooldownReductionPerLevelInFPS = 12;
        Constants.HolyHpPerLevel = 5;
        Constants.HolyPixelsPerLevel = 5;
        Constants.HolyStartPixels = 10;
        Constants.TempleColor = ex.Color.fromHex('#653459');
        Constants.FanaticColor = ex.Color.fromHex('#ED1C24');
        Constants.HolyColor = ex.Color.fromHex('#03BAB3');
        Constants.AtheistColor = ex.Color.fromHex('#FF00FF');
        Constants.TempleFaithCost = 30;
        Constants.FanaticFaithCost = 15;
        Constants.HolyFaithCost = 60;
        Constants.TempleFaithCostPerLevel = 10;
        Constants.FanaticFaithCostPerLevel = 5;
        Constants.HolyFaithCostPerLevel = 20;
        Constants.TempleFaithUpgradeCost = Constants.TempleFaithCost * 4;
        Constants.FanaticFaithUpgradeCost = Constants.FanaticFaithCost * 4;
        Constants.HolyFaithUpgradeCost = Constants.HolyFaithCost * 4;
        Constants.StartFaith = 45;
        Constants.TempleCooldown = 120;
        Constants.HolyCooldown = 180;
        Constants.MaxAtheistSpeed = 300;
        Constants.MaxAtheistSize = 50;
        Constants.AtheistBaseCooldown = 200;
        Constants.AtheistMinCooldown = 60;
        Constants.AtheistMinCooldownReductionPerGameLevel = 5;
        Constants.TempleWeight = 30;
        Constants.FanaticWeight = 10;
        Constants.HolyWeight = 50;
        Constants.FanaticShootSpeed = 300;
        Constants.StartFaithGoal = 50;
        Constants.RaidAtheistCountPerLevel = 10;
        Constants.RaidCooldown = 500;
        Constants.RaidCooldownReductionPerLevel = 50;
        return Constants;
    })();
    Geom.Constants = Constants;
    (function (HolyObjects) {
        HolyObjects[HolyObjects["Temple"] = 0] = "Temple";
        HolyObjects[HolyObjects["Fanatic"] = 1] = "Fanatic";
        HolyObjects[HolyObjects["Holy"] = 2] = "Holy";
    })(Geom.HolyObjects || (Geom.HolyObjects = {}));
    var HolyObjects = Geom.HolyObjects;
})(Geom || (Geom = {}));
//# sourceMappingURL=Constants.js.map