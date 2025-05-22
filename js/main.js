// DOM İçeriği Yüklendiğinde Çalıştır
document.addEventListener('DOMContentLoaded', function() {
    // Preloader Animasyonu
    initPreloader();
    
    // Mobil Menü İşlevselliği
    initMobileMenu();
    
    // Sayfa Kaydırma İşlevselliği
    initSmoothScroll();
    
    // Kaydırma İle Header Stilini Değiştir
    initScrollHeader();
    
    // Randevu Formu İşlevselliği
    initAppointmentForm();
    
    // Bülten Abone Formu İşlevselliği
    initNewsletterForm();
    
    // Testimonial Slider İşlevselliği
    initTestimonialsSlider();
    
    // Sayfa Animasyonları
    initAnimations();
    
    // İstatistik Sayaçları
    initCounters();
    
    // Paralaks Efekti
    initParallax();
    
    // Type Writer Efekti
    initTypeWriter();
    
    // Sayfaya Animasyonlu Arka Plan Ekle
    addAnimatedBackground();
});

// Preloader Animasyonu
function initPreloader() {
    // Preloader HTML'ini oluştur ve body'e ekle
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    preloader.appendChild(loader);
    document.body.prepend(preloader);
    
    // Sayfa tam olarak yüklendiğinde preloader'ı gizle
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
            
            // Preloader tamamen kaybolduğunda DOM'dan kaldır
            setTimeout(function() {
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Mobil Menü İşlevselliği
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Menü İkon Değişimi (Hamburger <-> X)
            if (navLinks.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Mobil Menüde Link Tıklandığında Menüyü Kapat
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Yumuşak Sayfa Kaydırma İşlevselliği
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Header Yüksekliğini Hesapla
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Elemanın Pozisyonunu Hesapla ve Header Yüksekliğini Çıkar
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Sayfayı Yumuşakça Kaydır
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Kaydırma İle Header Stilini Değiştir
function initScrollHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Randevu Formu İşlevselliği
function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form Verilerini Al
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Form Gönderimini Simüle Et
            console.log('Form Verileri:', formValues);
            
            // Başarılı Gönderim Bildirimi
            showFormSuccess(appointmentForm, 'Randevunuz başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz.');
            
            // Formu Sıfırla
            this.reset();
        });
    }
}

// Bülten Abone Formu İşlevselliği
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // E-posta Adresini Al
            const email = this.querySelector('input[type="email"]').value;
            
            // Abone İşlemini Simüle Et
            console.log('Bülten Aboneliği:', email);
            
            // Başarılı Gönderim Bildirimi
            showFormSuccess(newsletterForm, 'Bültenimize başarıyla abone oldunuz. Teşekkür ederiz!');
            
            // Formu Sıfırla
            this.reset();
        });
    }
}

// Form Başarılı Gönderim Bildirimi
function showFormSuccess(form, message) {
    // Mevcut Bildirim Varsa Kaldır
    const existingMessage = form.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Bildirim Oluştur
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    // Bildirim Stilini Ayarla
    successMessage.style.backgroundColor = '#52B788';
    successMessage.style.color = 'white';
    successMessage.style.padding = '15px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.marginTop = '20px';
    successMessage.style.display = 'flex';
    successMessage.style.alignItems = 'center';
    successMessage.style.gap = '10px';
    
    // Bildirimi Forma Ekle
    form.appendChild(successMessage);
    
    // 5 Saniye Sonra Bildirimi Kaldır
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Testimonial Slider İşlevselliği
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    
    if (!slider) return;
    
    // Otomatik Kaydırma İçin Değişkenler
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Fare ile Kaydırma İşlevselliği
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Kaydırma Hızı
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Otomatik Kaydırma İşlevselliği
    let autoScrollInterval;
    let scrollDirection = 1; // 1: sağa, -1: sola
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            // Slider Genişliğini Hesapla
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth + 30; // 30: gap değeri
            
            // Mevcut Kaydırma Pozisyonu
            const currentScroll = slider.scrollLeft;
            
            // Maksimum Kaydırma Pozisyonu
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            
            // Kaydırma Yönünü Kontrol Et
            if (currentScroll >= maxScroll - 10) {
                scrollDirection = -1; // Sola kaydır
            } else if (currentScroll <= 10) {
                scrollDirection = 1; // Sağa kaydır
            }
            
            // Kaydırma İşlemi
            slider.scrollBy({
                left: cardWidth * scrollDirection,
                behavior: 'smooth'
            });
        }, 4000); // 4 saniye
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Otomatik Kaydırmayı Başlat
    startAutoScroll();
    
    // Kullanıcı Etkileşiminde Otomatik Kaydırmayı Durdur
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('touchstart', stopAutoScroll);
    
    // Kullanıcı Etkileşimi Bitince Otomatik Kaydırmayı Tekrar Başlat
    slider.addEventListener('mouseleave', startAutoScroll);
    slider.addEventListener('touchend', startAutoScroll);
}

// Sayfa Animasyonları - Geliştirilmiş
function initAnimations() {
    // Görünür Alanı İzleme
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // İstatistik elemanlarının animasyonunu aktifleştir
                if (entry.target.classList.contains('about-stats')) {
                    const stats = entry.target.querySelectorAll('.stat');
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.classList.add('animate');
                        }, index * 300);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animasyon Uygulanacak Elementler - Genişletilmiş Liste
    const animationElements = [
        '.section-header',
        '.service-card',
        '.about-content',
        '.about-stats',
        '.expert-card',
        '.blog-card',
        '.testimonial-card',
        '.contact-content',
        '.appointment-form',
        '.appointment-text',
        '.hero-content',
        '.hero-image'
    ];
    
    // Elementleri Gözlemci Listesine Ekle
    animationElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    });
    
    // Servis Kartlarına Gecikme Ekle
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Blog Kartlarına Gecikme Ekle
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Uzman Kartlarına Gecikme Ekle
    const expertCards = document.querySelectorAll('.expert-card');
    expertCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // CSS İle Animasyon Stil Kuralları Ekle
    addAnimationStyles();
}

// İstatistik Sayaçları Animasyonu
function initCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const targetNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        let increment = targetNumber / 50; // 50 adımda hedefe ulaş
        
        const updateCounter = () => {
            if (stat.classList.contains('counted')) return;
            
            if (currentNumber < targetNumber) {
                currentNumber += increment;
                
                if (currentNumber > targetNumber) {
                    currentNumber = targetNumber;
                }
                
                stat.textContent = Math.floor(currentNumber);
                
                if (currentNumber < targetNumber) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.classList.add('counted');
                }
            }
        };
        
        // Sayacı gözlemle
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !stat.classList.contains('counted')) {
                    stat.textContent = '0';
                    requestAnimationFrame(updateCounter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Paralaks Efekti
function initParallax() {
    // Hero bölümüne paralaks efekti ekle
    const hero = document.getElementById('hero');
    if (hero) {
        hero.classList.add('parallax');
    }
    
    // Hakkımızda bölümüne paralaks efekti ekle
    const about = document.getElementById('hakkimizda');
    if (about) {
        about.classList.add('parallax');
    }
    
    // Kaydırma sırasında paralaks efektini uygula
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = 0.5; // Paralaks hızı
            element.style.backgroundPositionY = `${scrollPosition * speed}px`;
        });
    });
}

// Type Writer Efekti
function initTypeWriter() {
    const heroTitle = document.querySelector('.hero-content h1');
    
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); // Her 50 milisaniyede bir karakter yaz
        }
    }
    
    // Sayfa yüklendiğinde type writer başlat
    typeWriter();
}

// Animasyonlu Arka Plan Ekleme
function addAnimatedBackground() {
    // Randevu bölümüne animasyonlu arka plan ekle
    const randevu = document.getElementById('randevu');
    if (randevu) {
        randevu.classList.add('bg-animated');
    }
    
    // Testimonials bölümüne animasyonlu arka plan ekle
    const testimonials = document.getElementById('testimonials');
    if (testimonials) {
        testimonials.classList.add('bg-animated');
    }
}

// Animasyon Stilleri Ekle
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card.animate-on-scroll:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .service-card.animate-on-scroll:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .expert-card.animate-on-scroll:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .expert-card.animate-on-scroll:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .blog-card.animate-on-scroll:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .blog-card.animate-on-scroll:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Aktif Menü Öğesini İşaretle
function updateActiveMenuLink() {
    // Tüm Bölümleri Al
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Kullanıcının Şu Anda Görüntülediği Bölümü Hesapla
    let currentSection = '';
    const scrollPosition = window.scrollY;
    
    // Header Yüksekliğini Hesapla
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100; // 100: tolerans değeri
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Menü Öğelerini Güncelle
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // # işaretini kaldır
        
        if (href === currentSection) {
            link.classList.add('active');
        }
        
        // Ana Sayfa İçin Özel Durum
        if (scrollPosition < 100 && href === 'header') {
            link.classList.add('active');
        }
    });
}

// Sayfa Kaydırıldığında Aktif Menü Öğesini Güncelle
window.addEventListener('scroll', updateActiveMenuLink);

// Sayfa Yüklendiğinde Aktif Menü Öğesini Güncelle
window.addEventListener('load', updateActiveMenuLink); 