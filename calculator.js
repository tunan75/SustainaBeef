// Existing constants remain the same...

// Main Calculation Function
function calculate() {
    const guestConsumption = parseFloat(document.getElementById("guestConsumption").value);
    const staffConsumption = parseFloat(document.getElementById("staffConsumption").value);
    const totalConsumption = guestConsumption + staffConsumption;

    // Full Set Model Calculation (Distribute based on provided percentages)
    const fullSetSteers = totalConsumption / steerYield;

    // Calculate total available cuts from the Full Set
    const fullSetPremiumCuts = fullSetSteers * premiumCutYield * steerYield;
    const fullSetThinSteaks = fullSetSteers * thinSteaksYield * steerYield;
    const fullSetBoneInRoasts = fullSetSteers * boneInRoastsYield * steerYield;
    const fullSetCubeMeat = fullSetSteers * cubeMeatYield * steerYield;
    const fullSetGroundMeat = fullSetSteers * groundMeatYield * steerYield;

    // Calculate quantities for guests and staff based on percentages
    const guestPremiumCuts = fullSetPremiumCuts * guestUse.premiumCuts;
    const staffPremiumCuts = fullSetPremiumCuts * staffUse.premiumCuts;

    const guestThinSteaks = fullSetThinSteaks * guestUse.thinSteaks;
    const staffThinSteaks = fullSetThinSteaks * staffUse.thinSteaks;

    const guestBoneInRoasts = fullSetBoneInRoasts * guestUse.boneInRoasts;
    const staffBoneInRoasts = fullSetBoneInRoasts * staffUse.boneInRoasts;

    const guestCubeMeat = fullSetCubeMeat * guestUse.cubeMeat;
    const staffCubeMeat = fullSetCubeMeat * staffUse.cubeMeat;

    const guestGroundMeat = fullSetGroundMeat * guestUse.groundMeat;
    const staffGroundMeat = fullSetGroundMeat * staffUse.groundMeat;

    // Calculate Total Beef for Full Set (Guests + Staff)
    const fullSetTotal = guestConsumption + staffConsumption;

    // Premium Model Calculation
    const premiumGuestSteers = guestConsumption / (premiumCutYield * steerYield);
    const premiumStaffSteers = staffConsumption / steerCanteenBeef; // 10 kg = 1 steer for low-quality beef

    // Calculate Total Beef for Premium Model (Guests + Staff)
    const premiumTotal = guestConsumption + staffConsumption;

    // Update HTML with Results for Premium Only
    document.getElementById("premiumResult").innerHTML = `
        <h4>Total Cows Slaughtered: ${(premiumGuestSteers + premiumStaffSteers).toFixed(2)}</h4>
        Premium Cuts for Guests (High Quality): ${guestConsumption} kg<br>
        Premium Cuts for Staff (Low Quality): ${staffConsumption} kg
        <br><br>
        <ul>
            <li>Premium Cuts: ${(guestConsumption * guestUse.premiumCuts).toFixed(2)} kg</li>
            <li>Thin Steaks: ${(guestConsumption * guestUse.thinSteaks).toFixed(2)} kg</li>
            <li>Bone-In Roasts: ${(guestConsumption * guestUse.boneInRoasts).toFixed(2)} kg</li>
            <li>Cube Meat: ${(guestConsumption * guestUse.cubeMeat).toFixed(2)} kg</li>
            <li>Ground Meat: ${(guestConsumption * guestUse.groundMeat).toFixed(2)} kg</li>
        </ul>
    `;
    // Update Total Beef for Premium Model
    document.getElementById("premiumTotal").textContent = `${premiumTotal.toFixed(2)} kg`;

    // Update HTML with Results for Full Set
    document.getElementById("fullsetResult").innerHTML = `
        <h4>Total Cows Slaughtered: ${fullSetSteers.toFixed(2)}</h4>
        <h4>Full Set Model (For Guests):</h4>
        Premium Cuts: ${guestPremiumCuts.toFixed(2)} kg<br>
        Thin Steaks: ${guestThinSteaks.toFixed(2)} kg<br>
        Bone-In Roasts: ${guestBoneInRoasts.toFixed(2)} kg<br>
        Cube Meat: ${guestCubeMeat.toFixed(2)} kg<br>
        Ground Meat: ${guestGroundMeat.toFixed(2)} kg<br>
        <h4>Full Set Model (For Staff):</h4>
        Premium Cuts: ${staffPremiumCuts.toFixed(2)} kg<br>
        Thin Steaks: ${staffThinSteaks.toFixed(2)} kg<br>
        Bone-In Roasts: ${staffBoneInRoasts.toFixed(2)} kg<br>
        Cube Meat: ${staffCubeMeat.toFixed(2)} kg<br>
        Ground Meat: ${staffGroundMeat.toFixed(2)} kg
    `;
    // Update Total Beef for Full Set Model
    document.getElementById("fullSetTotal").textContent = `${fullSetTotal.toFixed(2)} kg`;

    // Environmental Impact Calculation
    const premiumModelCO2 = (premiumGuestSteers + premiumStaffSteers) * co2PerSteer;
    const fullSetModelCO2 = fullSetSteers * co2PerSteer;
    const co2Difference = premiumModelCO2 - fullSetModelCO2;

    // Carbon Footprint Offset
    const carbonFootprintOffset = fullSetSteers * carbonOffsetPerSteer;

    // Calculate how many cows are saved
    const cowsSaved = (premiumGuestSteers + premiumStaffSteers) - fullSetSteers;

    // Update the environmental impact results
    document.getElementById("environmentImpact").innerHTML = `
        <div style="text-align:center;">
            <h4>Environmental Impact Comparison</h4>
            CO₂ Saved: ${formatNumber(co2Difference, "metric tons")}<br>
            Water Saved: ${formatNumber(((premiumGuestSteers + premiumStaffSteers) * waterPerSteer - fullSetSteers * waterPerSteer), "m³")}<br>
            Land Saved: ${formatNumber(((premiumGuestSteers + premiumStaffSteers) * landPerSteer - fullSetSteers * landPerSteer), "hectares")}<br>
            Carbon Footprint Offset: ${formatNumber(carbonFootprintOffset, "metric tons")}<br>
            <br>
            <h4>Cows Saved: ${cowsSaved.toFixed(2)}</h4>
        </div>
    `;
}
