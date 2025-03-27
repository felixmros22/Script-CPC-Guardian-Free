# Script-CPC-Guardian-Free
Versión gratuita de Script para Google ads que controla los CPC - CPC Guardian Free
Script CPC Guardian
Optimiza tu Publicidad en Google Ads con Este Script Exclusivo.

🔍 Descubre cómo este script puede ayudarte a reducir costos y mejorar el rendimiento de tus campañas.

📌 Beneficios del Script

✅ Detecta automáticamente aumentos en el CPC y envía alertas para que actúes rápido.

✅ Guarda un historial de CPC en Google Sheets para analizar tendencias.

✅ Automatiza la supervisión de tus campañas, ahorrándote tiempo y dinero.

✅ Configuración fácil y rápida: copia, pega y ejecuta en Google Ads.

💡 No dejes que tu presupuesto se desperdicie. Controla el rendimiento de tus anuncios con este script gratuito.

✅ Este script ha sido probado en múltiples cuentas publicitarias, logrando optimizar costos y mejorar resultados en Google Ads.


👉 Descárgalo ahora y comienza a optimizar tus campañas hoy mismo.

💡 Si necesitas que lo adapte para que encaje perfectamente con tu marca, dime y lo ajustamos. 😃🚀

📘 Manual de Implementación del Script de Monitoreo de CPC
🔹 Introducción
Este script monitorea los cambios en el Costo por Clic (CPC) promedio de tus campañas en Google Ads y envía alertas si el aumento supera un umbral predefinido. Los datos se almacenan en un Google Sheet y se envían alertas por email y Slack.

🔹 Pasos de Implementación
1️⃣ Configurar la Hoja de Cálculo en Google Sheets
Crea una hoja de cálculo en Google Sheets.
Copia el ID de la hoja, que se encuentra en la URL de Google Sheets. Ejemplo:
https://docs.google.com/spreadsheets/d/1PlWPlTjAuOnnGOVdTHSGP1ttpzAvVcmSDJfE0TOX_Bs/edit
→ El ID es: 1PlWPlTjAuOnnGOVdTHSGP1ttpzAvVcmSDJfE0TOX_Bs

Asegúrate de que la hoja de cálculo tenga los siguientes encabezados en la primera fila.
📊 Datos de Campañas:
Fecha | Campaign Name	| Average CPC |	Umbral de Alerta | Última Alerta

2️⃣ Configurar el Script en Google Ads
Entra en Google Ads Scripts.
Crea un Nuevo Script.
Copia y pega el código del script.
Modifica los siguientes valores en el script:
ALERT_THRESHOLD: Define el umbral de alerta (por defecto es 20% de aumento).
email: Dirección de correo donde se enviarán las alertas.
SHEET_ID: ID de la hoja de Google Sheets donde se almacenarán los datos.
SLACK_WEBHOOK_URL: URL del webhook de Slack si deseas recibir alertas allí.
Guarda y autoriza el script.

Configura una ejecución automática cada 24 horas o con la frecuencia deseada.
3️⃣ Verificación y Pruebas
✅ Revisa Google Sheets para asegurarte de que se están guardando los datos correctamente.
✅ Verifica tu correo para recibir alertas de CPC.
✅ Si usas Slack, revisa que las notificaciones estén llegando correctamente.

🔹 Funcionamiento del Script
Obtiene datos del CPC de las campañas activas con más de 50 clics en los últimos 7 días.
Compara el CPC con el dato anterior registrado en Google Sheets.
Si el CPC aumenta más del umbral definido, envía una alerta por correo y Slack.
Guarda los nuevos datos en la hoja de cálculo para futuras comparaciones.
