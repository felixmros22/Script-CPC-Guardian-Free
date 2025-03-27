// Creado por @felixmros

function main() {
    var ALERT_THRESHOLD = 1.2; // 20% de aumento en CPC por defecto
    var email = "tuemail@tudominio.com"; // Email de alerta
    var SHEET_ID = "4PlWPlTjAuOnnGOVdTHSGP4ttpzFvVcmSDJfE0TOX_Bs"; // ID de Google Sheet sustituir por el ID del sheet que tienes que crear.
    var SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/TU_ID/EL_ID/WEBHOOK"; // Webhook de Slack

    var sheet;
    try {
        sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    } catch (e) {
        MailApp.sendEmail(email, "🚨 ERROR en el script de CPC", "No se pudo acceder a la hoja de cálculo. Revisa el ID o los permisos.");
        return;
    }

    var data = sheet.getDataRange().getValues();
    var lastCpcData = {};
    var umbralPorCampaña = {};
    var alertasAnteriores = {};

    for (var i = 1; i < data.length; i++) {
        var campaignName = data[i][1];
        var cpcAnterior = parseFloat(data[i][2]) || null;
        var umbral = parseFloat(data[i][3]) || ALERT_THRESHOLD;
        var ultimaAlerta = data[i][4] || ""; // Última alerta enviada

        lastCpcData[campaignName] = cpcAnterior;
        umbralPorCampaña[campaignName] = umbral;
        alertasAnteriores[campaignName] = ultimaAlerta;
    }

    var report = AdsApp.report(
        "SELECT CampaignName, AverageCpc " +
        "FROM CAMPAIGN_PERFORMANCE_REPORT " +
        "WHERE Clicks > 50 " +
        "DURING LAST_7_DAYS"
    );

    var rows = report.rows();
    var alertas = [];
    var newCpcData = [];
    var date = new Date().toISOString();

    while (rows.hasNext()) {
        var row = rows.next();
        var campaignName = row["CampaignName"];
        var avgCpc = parseFloat(row["AverageCpc"]);
        var cpcAnterior = lastCpcData[campaignName] || null;
        var umbral = umbralPorCampaña[campaignName] || ALERT_THRESHOLD;

        var alertaMsg = "";
        if (cpcAnterior && avgCpc > cpcAnterior * umbral) {
            alertaMsg = `🚨 CPC de ${campaignName} ha subido un ${( (avgCpc / cpcAnterior - 1) * 100 ).toFixed(2)}% 
            📊 CPC Anterior: ${cpcAnterior.toFixed(2)} | CPC Actual: ${avgCpc.toFixed(2)}`;

            // Evitar alertas repetidas: Solo enviar si es una nueva variación
            if (alertasAnteriores[campaignName] !== alertaMsg) {
                alertas.push(alertaMsg);
                alertasAnteriores[campaignName] = alertaMsg;
            }
        }

        // Guardar datos para la próxima ejecución
        newCpcData.push([date, campaignName, avgCpc, umbral, alertaMsg]);
    }

    // Limpiar hoja y escribir nueva data sin sobrescribir encabezados
    if (newCpcData.length > 0) {
        sheet.clear();
        sheet.appendRow(["Fecha", "Campaign Name", "Average CPC", "Umbral de Alerta", "Última Alerta"]);
        sheet.getRange(2, 1, newCpcData.length, 5).setValues(newCpcData);
    }

    // Enviar alertas por email
    if (alertas.length > 0 && email.includes("@")) {
        MailApp.sendEmail(email, "🚨 ALERTA: Aumento de CPC en Google Ads", alertas.join("\n"));
    }

    // Enviar alertas a Slack si hay variaciones significativas
    if (alertas.length > 0) {
        sendSlackAlert(alertas.join("\n"), SLACK_WEBHOOK_URL);
    }
}

// Función para enviar alerta a Slack
function sendSlackAlert(message, webhookUrl) {
    var payload = JSON.stringify({ text: message });

    UrlFetchApp.fetch(webhookUrl, {
        method: "post",
        contentType: "application/json",
        payload: payload
    });
}

