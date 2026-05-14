import html2pdf from 'html2pdf.js';

/**
 * Robust PDF generator that ensures consistent high-quality output.
 * @param {HTMLElement} element - The DOM element to capture.
 * @param {Object} resumeData - The resume data for naming the file.
 */
export const generateProfessionalPDF = async (element, resumeData) => {
  if (!element) return;

  // 1. Enter Export Mode
  document.body.classList.add('is-exporting');
  
  // 2. Save original styles
  const originalStyles = {
    padding: element.style.padding,
    width: element.style.width,
    minHeight: element.style.minHeight,
    overflow: element.style.overflow,
    boxShadow: element.style.boxShadow,
    borderRadius: element.style.borderRadius,
    backgroundColor: element.style.backgroundColor
  };

  // 3. Force exact A4 dimensions for the capture engine
  // 794px is the standard web-to-A4 width (210mm at 96dpi)
  element.style.setProperty('width', '794px', 'important');
  element.style.setProperty('min-height', 'auto', 'important');
  element.style.setProperty('overflow', 'visible', 'important');
  element.style.setProperty('box-shadow', 'none', 'important');
  element.style.setProperty('border-radius', '0', 'important');
  element.style.setProperty('background-color', '#ffffff', 'important');
  
  // Remove any internal shadows/scrollbars that cause black lines
  const allElements = element.querySelectorAll('*');
  allElements.forEach(el => {
    el.style.setProperty('box-shadow', 'none', 'important');
    el.style.setProperty('overflow', 'visible', 'important');
  });

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `${resumeData?.title || 'Resume'}.pdf`,
    image: { type: 'png', quality: 1.0 }, // Switch to PNG to avoid JPEG compression artifacts
    html2canvas: { 
      scale: 3, // Higher scale for ultra-sharp rendering
      useCORS: true, 
      logging: false,
      letterRendering: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794
    },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', compress: true },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    // 4. Capture with the Stable Engine
    await html2pdf().from(element).set(opt).save();
  } catch (err) {
    console.error('PDF Generation Error:', err);
    throw err;
  } finally {
    // 5. Restore original styles
    Object.keys(originalStyles).forEach(key => {
      element.style[key] = originalStyles[key];
    });
    document.body.classList.remove('is-exporting');
  }
};
