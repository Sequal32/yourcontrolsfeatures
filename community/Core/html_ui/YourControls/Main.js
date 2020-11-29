Include.addScript("/YourControls/TouchScreenKeys.js");
Include.addScript("/YourControls/Keys.js");

// Only one panel should fire event
var myPanelId = Math.floor(Math.random() * 1000)
SimVar.SetSimVarValue("L:YourControlPanelId", "Number", myPanelId)

function YourControlCanProcess() {
    return SimVar.GetSimVarValue("L:YourControlPanelId", "Number") == myPanelId
}

function YourControlOnInteractionEvent(_args) {
    if (!YourControlCanProcess()) {return}

    const mapId = hEventKeyMapping[_args[0].toUpperCase()];

    if (mapId != null) {
        SimVar.SetSimVarValue("K:Custom.Event7777", "number", mapId);
    }
}

function YourControlOnButtonEvent(panel, eventName) {
    const split = eventName.indexOf("#")

    const instrumentName = eventName.substring(0, split)
    const buttonName = eventName.substring(split + 1)

    for (var i = 0; i < panel.children.length; i++) {
        var instrument = panel.children[i];
        if (instrument.instrumentIdentifier.toUpperCase() == instrumentName.toUpperCase()) {
            instrument.onButtonPressed(instrument.getChildById(buttonName))
        }
    }
}

function YourControlOnPanelEvent(instrumentName, buttonName) {
    const mapId = instrumentButtonMapping[instrumentName + "_" + buttonName]
    if (mapId != null) {
        SimVar.SetSimVarValue("K:Custom.Event7778", "number", mapId)
    }
}