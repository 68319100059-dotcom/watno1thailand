document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // ตรวจสอบว่าลิงก์เป็นแบบ Anchor link (มี #) หรือไม่
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            } 
            // ลิงก์ที่ไม่มี # (เช่น contact.html) จะทำงานตามปกติโดยไม่ต้องแก้ไข
            // e.g. a link to 'contact.html' will now work as intended
        });
    });

    // Enhanced search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const templeCards = document.querySelectorAll('.temple-card');
    const templeSectionTitle = document.getElementById('temple-section-title');
    
    // กำหนดจำนวนวัดที่ต้องการแสดงเป็น "วัดแนะนำ"
    const featuredTemplesCount = 6;

    // ฟังก์ชันเริ่มต้น: แสดงเฉพาะวัดแนะนำ 6 อันแรก
    function showFeaturedTemples() {
        templeSectionTitle.innerHTML = `<i class="fas fa-star"></i> วัดแนะนำยอดนิยม`;
        templeCards.forEach((card, index) => {
            if (index < featuredTemplesCount) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // เรียกใช้งานฟังก์ชันเริ่มต้นเมื่อโหลดหน้าเว็บ
    showFeaturedTemples();

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let found = false;

        if (searchTerm === '') {
            // ถ้าช่องค้นหาว่าง ให้แสดงวัดแนะนำ
            showFeaturedTemples();
            return;
        }

        // เปลี่ยนหัวข้อเป็น "ผลลัพธ์การค้นหา"
        templeSectionTitle.innerHTML = `<i class="fas fa-search"></i> ผลลัพธ์การค้นหา`;

        // ซ่อนการ์ดทั้งหมดก่อนเริ่มค้นหา
        templeCards.forEach(card => {
            card.style.display = 'none';
        });

        // ค้นหาและแสดงเฉพาะการ์ดที่ตรงกับคำค้นหา
        templeCards.forEach(card => {
            const templeName = card.querySelector('h4').textContent.toLowerCase();
            const templeProvince = card.querySelector('.province-name').textContent.toLowerCase();

            if (templeName.includes(searchTerm) || templeProvince.includes(searchTerm)) {
                card.style.display = 'block';
                found = true;
            }
        });

        if (!found) {
            // หากไม่พบ ให้แสดงข้อความแจ้งเตือน
            const noResultsMessage = document.createElement('p');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.textContent = 'ไม่พบวัดที่คุณค้นหา ลองใช้คำค้นอื่น ๆ เช่น ชื่อวัดเต็ม หรือชื่อจังหวัด';
            
            // เช็คว่ามีข้อความนี้อยู่แล้วหรือยัง ถ้ามีไม่ต้องสร้างใหม่
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            const container = document.querySelector('#featured-temples .container');
            container.appendChild(noResultsMessage);

            // เลื่อนหน้าจอไปยังส่วนของผลลัพธ์การค้นหา
            templeSectionTitle.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        } else {
            // หากพบผลลัพธ์ ให้ลบข้อความ "ไม่พบผลลัพธ์" ถ้ามี
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            // เลื่อนหน้าจอไปยังส่วนของผลลัพธ์การค้นหา
            templeSectionTitle.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});