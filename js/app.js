const pricingData = {
  jallo: {
    residential: {
      '2.5marla': { total: '2,200,000', advance: '500,000', installment: '20,000' },
      '3marla': { total: '3,700,000', advance: '700,000', installment: '30,000' },
      '5marla': { total: '5,500,000', advance: '900,000', installment: '40,000' }
    },
    constructed: {
      '2.5marla': {
        single: { total: '2,000,000', advance: '400,000', installment: '30,000' },
        double: { total: '3,500,000', advance: '600,000', installment: '30,000' }
      },
      '3marla': {
        single: { total: '3,500,000', advance: '700,000', installment: '30,000' },
        double: { total: '4,500,000', advance: '800,000', installment: '30,000' }
      },
      '5marla': {
        single: { total: '4,500,000', advance: '800,000', installment: '20,000' },
        double: { total: '7,000,000', advance: '1,100,000', installment: '50,000' }
      }
    }
  }
};

function calculatePrice(location, category, size, story) {
  const locData = pricingData[location];
  if (!locData) return null;
  
  const catData = locData[category];
  if (!catData) return null;
  
  const sizeData = catData[size];
  if (!sizeData) return null;
  
  if (category === 'constructed') {
    const storyKey = story || 'single';
    return sizeData[storyKey] || null;
  }
  
  return sizeData;
}



// Browser environment initialization
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {


    // Entry selector modal quiz is removed.
    // City Selection and Filtering Logic
    function filterByCity(selectedCity) {
      // Update button active state
      document.querySelectorAll('.city-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-city') === selectedCity);
      });

      // Filter elements by data-city
      document.querySelectorAll('[data-city]').forEach(el => {
        if (el.classList.contains('city-btn')) return;
        const cities = el.getAttribute('data-city').split(' ');
        if (cities.includes(selectedCity)) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });

      // Update calculator location selection automatically
      // Update registration location selection automatically
      const regLoc = document.getElementById('reg-loc');
      if (regLoc) {
        if (selectedCity === 'lahore') {
          regLoc.value = 'jallo';
        } else if (selectedCity === 'faisalabad') {
          regLoc.value = 'jaranwala';
        } else if (selectedCity === 'okara') {
          regLoc.value = 'okara';
        } else if (selectedCity === 'rawalpindi') {
          regLoc.value = 'rawalpindi';
        }
        // trigger change event to refresh preview
        regLoc.dispatchEvent(new Event('change'));
      }
    }

    document.querySelectorAll('.city-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const city = btn.getAttribute('data-city');
        filterByCity(city);
        localStorage.setItem('selected-city', city);
      });
    });

    // Run default city filter on load
    const defaultCity = localStorage.getItem('selected-city') || 'lahore';
    filterByCity(defaultCity);

    // Jallo Pricing Table Tabs Toggle
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const tabTarget = btn.getAttribute('data-tab');
        document.querySelectorAll('.pricing-table-container').forEach(table => {
          table.classList.remove('active');
        });
        
        const activeTable = document.getElementById(`tab-${tabTarget}`);
        if (activeTable) activeTable.classList.add('active');
      });
    });



    // Registration Form & Local Database Logic
    const regLocSelect = document.getElementById('reg-loc');
    const regPlotSelect = document.getElementById('reg-plot');
    const regPhoneInput = document.getElementById('reg-phone');
    const regForm = document.getElementById('booking-registration-form');
    
    const previewLoc = document.getElementById('preview-loc');
    const previewPlot = document.getElementById('preview-plot');
    const previewContainer = document.getElementById('registration-preview');
    const successContainer = document.getElementById('registration-success');
    
    const btnRegWhatsapp = document.getElementById('btn-reg-whatsapp');
    const btnRegReset = document.getElementById('btn-reg-reset');
    const btnExportCsv = document.getElementById('btn-export-csv');
    const btnClearDb = document.getElementById('btn-clear-db');
    const adminDbBody = document.getElementById('admin-db-body');

    function updatePreview() {
      if (!regLocSelect || !regPlotSelect || !previewLoc || !previewPlot) return;
      previewLoc.textContent = regLocSelect.options[regLocSelect.selectedIndex].text;
      previewPlot.textContent = regPlotSelect.options[regPlotSelect.selectedIndex].text;
    }

    if (regLocSelect) regLocSelect.addEventListener('change', updatePreview);
    if (regPlotSelect) regPlotSelect.addEventListener('change', updatePreview);

    // Initial preview run
    updatePreview();

    function renderRegistrations() {
      if (!adminDbBody) return;
      const registrations = JSON.parse(localStorage.getItem('tpv_registrations') || '[]');
      
      if (registrations.length === 0) {
        adminDbBody.innerHTML = `
          <tr>
            <td colspan="5" style="padding: 24px; text-align: center; color: var(--slate-gray); font-size: 14px;" class="urdu-text">کوئی درخواست درج نہیں ہے۔</td>
          </tr>
        `;
        return;
      }

      adminDbBody.innerHTML = registrations.map((reg, idx) => `
        <tr>
          <td style="padding: 12px; font-size: 14px; color: var(--slate-gray); font-weight: 600;">${idx + 1}</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 700; color: var(--espresso-black); font-family: var(--font-main); letter-spacing: 0.05em;">${reg.phone}</td>
          <td style="padding: 12px; font-size: 14px; color: #333;" class="urdu-text">${reg.city}</td>
          <td style="padding: 12px; font-size: 14px; color: #333;" class="urdu-text">${reg.plot}</td>
          <td style="padding: 12px; font-size: 13px; color: var(--slate-gray); font-family: var(--font-main);">${reg.timestamp}</td>
        </tr>
      `).join('');
    }

    // Form submission
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const cityVal = regLocSelect.value;
        const cityName = regLocSelect.options[regLocSelect.selectedIndex].text;
        const plotVal = regPlotSelect.value;
        const plotName = regPlotSelect.options[regPlotSelect.selectedIndex].text;
        const phone = regPhoneInput.value.trim();
        
        if (!phone) return;
        
        const regId = 'TPV-' + Math.floor(1000 + Math.random() * 9000);
        const now = new Date();
        const timestamp = now.getFullYear() + '-' + 
          String(now.getMonth() + 1).padStart(2, '0') + '-' + 
          String(now.getDate()).padStart(2, '0') + ' ' + 
          String(now.getHours()).padStart(2, '0') + ':' + 
          String(now.getMinutes()).padStart(2, '0');
          
        const registrations = JSON.parse(localStorage.getItem('tpv_registrations') || '[]');
        registrations.unshift({ id: regId, city: cityName, plot: plotName, phone, timestamp });
        localStorage.setItem('tpv_registrations', JSON.stringify(registrations));
        
        // Hide form & preview, show success
        if (previewContainer) previewContainer.classList.add('hidden');
        if (successContainer) successContainer.classList.remove('hidden');
        
        // WhatsApp link setup
        const msg = `اسلام علیکم جہانزیب بھائی، میں نے تھیم پارک ویو ہاؤسنگ سوسائٹی کے پروجیکٹ میں بکنگ کے لیے ویب سائٹ پر رجسٹریشن کی ہے۔\n\nبکنگ تفصیلات:\nرجسٹریشن آئی ڈی: ${regId}\nلوکیشن: ${cityName}\nپلاٹ/گھر کی قسم: ${plotName}\nموبائل نمبر: ${phone}\nوقت: ${timestamp}\n\nبراہ کرم میری رجسٹریشن کی تصدیق کریں اور مجھے بکنگ کے مزید مراحل بتائیں۔ شکریہ۔`;
        if (btnRegWhatsapp) {
          btnRegWhatsapp.setAttribute('href', `https://wa.me/923218265844?text=${encodeURIComponent(msg)}`);
        }
        
        // Re-render table
        renderRegistrations();
      });
    }

    // Reset Form
    if (btnRegReset) {
      btnRegReset.addEventListener('click', () => {
        if (regForm) regForm.reset();
        if (previewContainer) previewContainer.classList.remove('hidden');
        if (successContainer) successContainer.classList.add('hidden');
        updatePreview();
      });
    }

    // Clear local db
    if (btnClearDb) {
      btnClearDb.addEventListener('click', () => {
        if (confirm('کیا آپ تمام درج شدہ درخواستوں کا ڈیٹا صاف کرنا چاہتے ہیں؟')) {
          localStorage.removeItem('tpv_registrations');
          renderRegistrations();
        }
      });
    }

    // Export CSV
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', () => {
        const registrations = JSON.parse(localStorage.getItem('tpv_registrations') || '[]');
        if (registrations.length === 0) {
          alert('درآمد کرنے کے لیے کوئی ڈیٹا موجود نہیں ہے۔');
          return;
        }
        
        let csvContent = 'No.,Mobile Number,Location,Plot Details,Timestamp\n';
        registrations.forEach((reg, index) => {
          // Escape values
          const cleanPhone = reg.phone.replace(/"/g, '""');
          const cleanCity = reg.city.replace(/"/g, '""');
          const cleanPlot = reg.plot.replace(/"/g, '""');
          const cleanTime = reg.timestamp.replace(/"/g, '""');
          
          csvContent += `${index + 1},"${cleanPhone}","${cleanCity}","${cleanPlot}","${cleanTime}"\n`;
        });
        
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `TPV_Registrations_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    // Initial render of local registrations
    renderRegistrations();

    // FAQ Accordion Collapsible Logic
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.faq-item');
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs first
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Video Player Interactions for all vertical video players
    const playerContainers = document.querySelectorAll('.vertical-player-container');
    playerContainers.forEach(container => {
      const video = container.querySelector('video');
      const overlay = container.querySelector('.player-overlay');
      if (video && overlay) {
        overlay.addEventListener('click', () => {
          overlay.style.display = 'none';
          video.setAttribute('controls', 'true');
          video.play();
        });
        
        video.addEventListener('ended', () => {
          video.removeAttribute('controls');
          overlay.style.display = 'flex';
        });
      }
    });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculatePrice };
}
