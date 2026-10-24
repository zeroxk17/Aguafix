import { CreateReportDto } from '../dtos/CreateReportDto';

const severityLabel: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const severityColor: Record<string, string> = {
  low: '#27ae60',
  medium: '#f39c12',
  high: '#e74c3c',
};

export function generateReportTemplate(
  dto: CreateReportDto,
  photoUrl: string,
): string {
  const label = severityLabel[dto.severity] ?? dto.severity;
  const color = severityColor[dto.severity] ?? '#555';
  const now = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo Reporte de Fuga de Agua</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a73e8;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;">
                &#128167; Nuevo Reporte de Fuga de Agua
              </h1>
              <p style="margin:6px 0 0;color:#d0e8ff;font-size:13px;">${now}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;color:#555;font-size:15px;">
                Se ha registrado un nuevo reporte ciudadano de fuga de agua en la vía pública.
                Por favor, atiende con la prioridad indicada.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;">
                    <span style="display:block;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">Severidad</span>
                    <span style="display:inline-block;margin-top:4px;padding:4px 12px;border-radius:12px;background-color:${color};color:#fff;font-size:13px;font-weight:bold;">
                      ${label}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;">
                    <span style="display:block;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">Dirección / Referencia</span>
                    <span style="display:block;margin-top:4px;font-size:15px;color:#222;">${dto.address}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;">
                    <span style="display:block;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">Descripción</span>
                    <span style="display:block;margin-top:4px;font-size:15px;color:#222;">${dto.description}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;">
                    <span style="display:block;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">Teléfono de contacto</span>
                    <span style="display:block;margin-top:4px;font-size:15px;color:#222;">${dto.reporterPhone}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;">
                    <span style="display:block;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">Foto de la fuga</span>
                    <img src="${photoUrl}" alt="Foto de la fuga" style="margin-top:8px;max-width:100%;border-radius:6px;border:1px solid #eee;" />
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f4f6f8;padding:16px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#aaa;">
                Este correo fue generado automáticamente por el sistema de reportes municipales.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
