// 初始化GSAP插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// DOM元素
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const contactValues = document.querySelectorAll('.contact-value');
const toast = document.getElementById('toast');
const navbarLinks = document.querySelectorAll('.navbar-link, .mobile-menu-link');
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroDescription = document.querySelector('.hero-description');
const achievementValues = document.querySelectorAll('.achievement-value[data-target]');
const skillProgresses = document.querySelectorAll('.skill-progress');
const timelineItems = document.querySelectorAll('.timeline-item');

// 导航栏智能隐藏
let lastScrollY = window.scrollY;
let ticking = false;

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    if (currentScrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// 移动端菜单
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
        // 同步主题切换按钮状态
        if (mobileThemeToggle) {
            if (document.body.classList.contains('dark-theme')) {
                mobileThemeToggle.textContent = '☀️';
            } else {
                mobileThemeToggle.textContent = '🌙';
            }
        }
    }
});

// 关闭移动端菜单
mobileMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('mobile-menu-link')) {
        mobileMenu.classList.remove('active');
    }
});

// 移动端菜单关闭按钮
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

// 移动端主题切换按钮
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            mobileThemeToggle.textContent = '☀️';
            themeToggle.textContent = '☀️';
        } else {
            mobileThemeToggle.textContent = '🌙';
            themeToggle.textContent = '🌙';
        }
    });
}

// 平滑滚动
navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            gsap.to(window, {
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                duration: 0.8,
                ease: 'power2.out'
            });
            
            // 关闭移动端菜单
            mobileMenu.classList.remove('active');
        }
    });
});

// 回到顶部
backToTop.addEventListener('click', () => {
    gsap.to(window, {
        scrollTo: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// Hero区动画
function animateHero() {
    gsap.from(heroTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from(heroSubtitle, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        onComplete: () => {
            // 打字机动效
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            let index = 0;
            function type() {
                if (index < text.length) {
                    heroSubtitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, 100);
                }
            }
            type();
        }
    });
    
    gsap.from(heroDescription, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    gsap.from('.scroll-arrow', {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.out'
    });
}

// 数据成果数字滚动
function animateAchievements() {
    achievementValues.forEach(value => {
        const target = parseInt(value.getAttribute('data-target'));
        gsap.to(value, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out'
        });
    });
}

// 技能条动画
function animateSkills() {
    skillProgresses.forEach(progress => {
        const width = progress.style.width;
        progress.style.width = '0';
        gsap.to(progress, {
            width: width,
            duration: 1.5,
            ease: 'power2.out'
        });
    });
}

// 时间线动画
function animateTimeline() {
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });
}

// 项目模态框
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        gsap.from('.modal-content', {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

function closeModal() {
    gsap.to('.modal-content', {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

modalClose.addEventListener('click', closeModal);

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeModal();
    }
});

// 按ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// 联系方式复制功能
contactValues.forEach(value => {
    value.addEventListener('click', () => {
        const text = value.getAttribute('data-copy');
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('已复制到剪贴板');
            });
        }
    });
});

// Toast提示
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 2000);
}

// 暗黑模式切换
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
});

// 滚动触发动画
function setupScrollTriggers() {
    // 数据成果区
    ScrollTrigger.create({
        trigger: '#achievements',
        start: 'top 80%',
        onEnter: animateAchievements
    });
    
    // 技能展示区
    ScrollTrigger.create({
        trigger: '#skills',
        start: 'top 80%',
        onEnter: animateSkills
    });
    
    // 经验背景区
    ScrollTrigger.create({
        trigger: '#experience',
        start: 'top 80%',
        onEnter: animateTimeline
    });
    
    // 项目展示区卡片动画
    gsap.utils.toArray('.project-card').forEach(card => {
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // 关于我和联系方式动画
    gsap.utils.toArray('.about-info, .about-description, .contact-card').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                gsap.from(element, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 初始化动画
    animateHero();
    setupScrollTriggers();
    
    // 图片懒加载
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });
        
        observer.observe(img);
    });
    
    // 导航栏链接高亮
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        navbarLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetTop = targetElement.offsetTop - 100;
                const targetBottom = targetTop + targetElement.offsetHeight;
                
                if (scrollPosition >= targetTop && scrollPosition < targetBottom) {
                    navbarLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
});

// 优化滚动性能
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 应用防抖
window.addEventListener('scroll', debounce(() => {
    // 滚动相关的操作
}, 16));

// 响应式处理
function handleResize() {
    // 重置滚动触发
    ScrollTrigger.refresh();
}

window.addEventListener('resize', handleResize);