"use client";

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function PDFExporter({ distributorInfo, invoiceHistory, onBack }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exporting, setExporting] = useState(false);

  const generatePDF = () => {
    if (!startDate || !endDate) {
      alert('Selecciona las fechas del reporte');
      return;
    }

    setExporting(true);

    // Filtrar facturas por rango de fechas
    const filteredInvoices = invoiceHistory.filter(inv => {
      const invDate = inv.date;
      return invDate >= new Date(startDate) && invDate <= new Date(endDate);
    });

    if (filteredInvoices.length === 0) {
      alert('No hay facturas en el rango de fechas seleccionado');
      setExporting(false);
      return;
    }

    // Calcular estadísticas
    const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const totalInvoices = filteredInvoices.length;
    const uniqueClients = new Set(filteredInvoices.map(inv => inv.client)).size;

    // Crear PDF
    const doc = new jsPDF();

    // Logo y Header
    doc.setFontSize(20);
    doc.text('MVV Natural', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Reporte de Ventas', 105, 30, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(`Distribuidor: ${distributorInfo.name} ${distributorInfo.last_name}`, 20, 45);
    doc.text(`Código: ${distributorInfo.code}`, 20, 52);
    doc.text(`Período: ${new Date(startDate).toLocaleDateString('es-MX')} - ${new Date(endDate).toLocaleDateString('es-MX')}`, 20, 59);

    // Estadísticas
    doc.setFontSize(12);
    doc.text('Resumen:', 20, 75);
    
    doc.setFontSize(10);
    doc.text(`Total de Ventas: $${totalRevenue.toFixed(2)}`, 20, 85);
    doc.text(`Facturas Generadas: ${totalInvoices}`, 20, 92);
    doc.text(`Clientes Únicos: ${uniqueClients}`, 20, 99);

    // Tabla de facturas
    const tableData = filteredInvoices.map(inv => [
      inv.date.toLocaleDateString('es-MX'),
      inv.client,
      `$${inv.total.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 110,
      head: [['Fecha', 'Cliente', 'Total']],
      body: tableData,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [74, 124, 89] }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Guardar
    const filename = `reporte_ventas_${distributorInfo.code}_${startDate}_${endDate}.pdf`;
    doc.save(filename);

    setExporting(false);
    alert(`✅ Reporte descargado: ${filename}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-como">Exportar Reporte PDF</h1>
              <p className="text-gray-600 mt-2">Genera un reporte profesional de tus ventas</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-como mb-4">Selecciona el Período</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Fecha Inicial *</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-como"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Fecha Final *</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-como"
                required
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            📄 El reporte incluirá:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Total de ventas del período</li>
              <li>Número de facturas generadas</li>
              <li>Clientes únicos</li>
              <li>Tabla detallada de todas las facturas</li>
            </ul>
          </p>
        </div>

        {/* Export Button */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            onClick={generatePDF}
            disabled={exporting || !startDate || !endDate}
            className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {exporting ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Generando PDF...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>Descargar Reporte PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

