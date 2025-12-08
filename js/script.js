// JavaScript 파일
// 필요한 인터랙션이 있으면 여기에 작성하세요

document.addEventListener('DOMContentLoaded', function() {
    console.log('Manual 페이지 로드 완료');
    
    // ========================================
    // 섹션 전환 기능
    // ========================================
    
    // 하위메뉴 섹션 목록
    const submenuSections = ['home', 'report', 'contract', 'document', 'debt', 'petition', 'supplement', 'progress', 'fee', 'calendar', 'office-info'];
    
    function switchSection(sectionId) {
        console.log('Switching to section:', sectionId);
        
        // 모든 섹션 숨기기
        const allSections = document.querySelectorAll('.content-section');
        console.log('Total sections found:', allSections.length);
        
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // 선택한 섹션만 보이기 - 더 구체적인 선택자 사용
        const targetSection = document.querySelector(`.content-section[data-section="${sectionId}"]`);
        console.log('Target section:', targetSection);
        
        if (targetSection) {
            targetSection.style.display = 'flex';
            console.log('Section displayed successfully!');
            
            // URL 해시 업데이트 (히스토리에 저장)
            window.location.hash = sectionId;
        } else {
            console.error('Target section not found!');
        }
        
        // 메뉴 활성화 상태 업데이트
        updateMenuActiveState(sectionId);
    }
    
    // 메뉴 활성화 상태 업데이트 함수
    function updateMenuActiveState(sectionId) {
        const isSubmenuSection = submenuSections.includes(sectionId);
        
        // 데스크탑 메뉴
        const allDesktopMenuItems = document.querySelectorAll('.sidebar .menu-item');
        const desktopMenuWithSubmenu = document.querySelector('.sidebar .menu-item.has-submenu');
        
        allDesktopMenuItems.forEach(item => {
            if (!item.classList.contains('has-submenu')) {
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
        
        // 하위메뉴 섹션이면 메뉴 안내 활성화
        if (isSubmenuSection && desktopMenuWithSubmenu) {
            desktopMenuWithSubmenu.classList.add('active');
        } else if (!isSubmenuSection && desktopMenuWithSubmenu) {
            desktopMenuWithSubmenu.classList.remove('active');
        }
        
        // 모바일 메뉴
        const allMobileMenuItems = document.querySelectorAll('.mobile-sidebar .mobile-menu-item');
        const mobileMenuWithSubmenu = document.querySelector('.mobile-sidebar .mobile-menu-item.has-submenu');
        
        allMobileMenuItems.forEach(item => {
            if (!item.classList.contains('has-submenu')) {
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
        
        // 하위메뉴 섹션이면 메뉴 안내 활성화
        if (isSubmenuSection && mobileMenuWithSubmenu) {
            mobileMenuWithSubmenu.classList.add('active');
        } else if (!isSubmenuSection && mobileMenuWithSubmenu) {
            mobileMenuWithSubmenu.classList.remove('active');
        }
    }
    
    // 페이지 로드 시 URL 해시 확인하여 섹션 표시
    function initializeSection() {
        const hash = window.location.hash.substring(1); // # 제거
        const sectionId = hash || 'install'; // 해시가 없으면 기본값 'install'
        
        console.log('Initializing section:', sectionId);
        
        // 섹션 표시 (해시 업데이트 없이)
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        
        const targetSection = document.querySelector(`.content-section[data-section="${sectionId}"]`);
        if (targetSection) {
            targetSection.style.display = 'flex';
            console.log('Section initialized:', sectionId);
        }
        
        // 메뉴 활성화 상태 업데이트
        updateMenuActiveState(sectionId);
    }
    
    // 페이지 로드 시 초기 섹션 설정
    initializeSection();
    
    // 브라우저 뒤로가기/앞으로가기 버튼 처리
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        const sectionId = hash || 'install';
        
        switchSection(sectionId);
    });
    
    // ========================================
    // 모바일 메뉴 토글
    // ========================================
    
    const menuButton = document.querySelector('.menu-button');
    const closeButton = document.querySelector('.close-button');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    // 메뉴 닫기 함수 (전역으로 사용)
    function closeMobileMenu() {
        if (mobileSidebar && mobileOverlay) {
            mobileSidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('menu-open'); // 클래스 제거로 스크롤 복원
        }
    }
    
    if (menuButton && mobileSidebar && mobileOverlay) {
        // 메뉴 열기
        menuButton.addEventListener('click', function() {
            mobileSidebar.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.classList.add('menu-open'); // 클래스 추가로 스크롤 방지
        });
        
        closeButton.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // 모바일 하위메뉴 토글
    const mobileMenuWithSubmenu = document.querySelector('.mobile-menu-item.has-submenu');
    const mobileSubmenu = document.querySelector('.mobile-submenu');
    const mobileIconRight = document.querySelector('.mobile-icon-right');
    const mobileIconDown = document.querySelector('.mobile-icon-down');
    
    // 모바일 메뉴 아이템들
    const allMobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    
    // 모바일 하위메뉴 닫기 함수
    function closeMobileSubmenu() {
        if (mobileSubmenu && mobileIconRight && mobileIconDown) {
            mobileSubmenu.classList.remove('open');
            mobileIconRight.style.display = 'block';
            mobileIconDown.style.display = 'none';
            
            // 다른 메인 메뉴로 이동할 때는 하위메뉴를 홈으로 리셋
            const mobileSubmenuItems = document.querySelectorAll('.mobile-submenu-item');
            mobileSubmenuItems.forEach(sub => sub.classList.remove('active'));
            if (mobileSubmenuItems[0]) {
                mobileSubmenuItems[0].classList.add('active');
            }
        }
    }
    
    // 일반 모바일 메뉴 아이템 클릭
    allMobileMenuItems.forEach(item => {
        if (!item.classList.contains('has-submenu')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 모든 모바일 메뉴 아이템에서 active 제거
                allMobileMenuItems.forEach(menu => menu.classList.remove('active'));
                
                // 클릭한 메뉴 아이템에 active 추가
                this.classList.add('active');
                
                // 하위메뉴 닫기
                closeMobileSubmenu();
                
                // 섹션 전환
                const sectionId = this.getAttribute('data-section');
                if (sectionId) {
                    switchSection(sectionId);
                }
                
                // 모바일 메뉴 닫기
                closeMobileMenu();
            });
        }
    });
    
    // 모바일 메뉴 안내 (하위메뉴 토글)
    if (mobileMenuWithSubmenu && mobileSubmenu && mobileIconRight && mobileIconDown) {
        mobileMenuWithSubmenu.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 일반 메뉴 아이템에서만 active 제거
            allMobileMenuItems.forEach(menu => {
                if (!menu.classList.contains('has-submenu')) {
                    menu.classList.remove('active');
                }
            });
            
            // 메뉴 안내 active 추가
            this.classList.add('active');
            
            // 서브메뉴 현재 상태 확인
            const wasOpen = mobileSubmenu.classList.contains('open');
            
            // 서브메뉴 토글
            mobileSubmenu.classList.toggle('open');
            
            // 아이콘 보이기/숨기기
            if (mobileSubmenu.classList.contains('open')) {
                // 열림 상태 → down 아이콘 보이기
                mobileIconRight.style.display = 'none';
                mobileIconDown.style.display = 'block';
                
                // 처음 열 때: 현재 섹션이 하위메뉴 섹션이 아니면 홈으로 이동
                if (!wasOpen) {
                    const currentHash = window.location.hash.substring(1);
                    const isCurrentSubmenuSection = submenuSections.includes(currentHash);
                    
                    const mobileSubmenuItems = document.querySelectorAll('.mobile-submenu-item');
                    mobileSubmenuItems.forEach(sub => sub.classList.remove('active'));
                    
                    if (!isCurrentSubmenuSection) {
                        // 하위메뉴 섹션이 아니면 홈으로 이동
                        if (mobileSubmenuItems[0]) {
                            mobileSubmenuItems[0].classList.add('active');
                        }
                        switchSection('home');
                    } else {
                        // 하위메뉴 섹션이면 해당 섹션의 메뉴 아이템 활성화
                        mobileSubmenuItems.forEach(item => {
                            if (item.getAttribute('data-section') === currentHash) {
                                item.classList.add('active');
                            }
                        });
                    }
                }
            } else {
                // 닫힘 상태 → right 아이콘 보이기
                mobileIconRight.style.display = 'block';
                mobileIconDown.style.display = 'none';
            }
        });
    }
    
    // 모바일 하위메뉴 아이템 클릭
    const mobileSubmenuItems = document.querySelectorAll('.mobile-submenu-item');
    mobileSubmenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 일반 메뉴 아이템(설치하기, 시작하기, 이용하기)에서만 active 제거
            allMobileMenuItems.forEach(menu => {
                if (!menu.classList.contains('has-submenu')) {
                    menu.classList.remove('active');
                }
            });
            
            // 메뉴 안내는 항상 active 유지
            if (mobileMenuWithSubmenu) {
                mobileMenuWithSubmenu.classList.add('active');
            }
            
            // 모든 하위메뉴 아이템에서 active 제거
            mobileSubmenuItems.forEach(sub => sub.classList.remove('active'));
            
            // 클릭한 하위메뉴에 active 추가
            this.classList.add('active');
            
            // 섹션 전환
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                switchSection(sectionId);
            }
            
            // 모바일 메뉴 닫기
            closeMobileMenu();
        });
    });
    
    // 데스크탑 메뉴 아이템 선택
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    // 하위메뉴 요소들
    const menuItemWithSubmenu = document.querySelector('.menu-item.has-submenu');
    const submenu = document.querySelector('.submenu');
    const iconRight = document.querySelector('.icon-right');
    const iconDown = document.querySelector('.icon-down');
    
    // 하위메뉴 닫기 함수
    function closeSubmenu() {
        if (submenu && menuItemWithSubmenu) {
            submenu.classList.remove('open');
            menuItemWithSubmenu.classList.remove('open');
            if (iconRight && iconDown) {
                iconRight.style.display = 'block';
                iconDown.style.display = 'none';
            }
            
            // 다른 메인 메뉴로 이동할 때는 하위메뉴를 홈으로 리셋
            const submenuItems = document.querySelectorAll('.submenu-item');
            submenuItems.forEach(sub => sub.classList.remove('active'));
            if (submenuItems[0]) {
                submenuItems[0].classList.add('active');
            }
        }
    }
    
    // 일반 메뉴 아이템 클릭 이벤트
    allMenuItems.forEach(item => {
        if (!item.classList.contains('has-submenu')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Desktop menu clicked:', this.textContent.trim());
                
                // 모든 메뉴 아이템에서 active 제거
                allMenuItems.forEach(menu => menu.classList.remove('active'));
                
                // 클릭한 메뉴 아이템에 active 추가
                this.classList.add('active');
                
                // 하위메뉴 닫기
                closeSubmenu();
                
                // 섹션 전환
                const sectionId = this.getAttribute('data-section');
                console.log('Section ID:', sectionId);
                if (sectionId) {
                    switchSection(sectionId);
                }
            });
        }
    });
    
    // 메뉴 안내 (하위메뉴 토글)
    if (menuItemWithSubmenu && submenu) {
        menuItemWithSubmenu.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모든 일반 메뉴 아이템에서 active 제거
            allMenuItems.forEach(menu => {
                if (!menu.classList.contains('has-submenu')) {
                    menu.classList.remove('active');
                }
            });
            
            // 메뉴 안내는 항상 active 유지
            this.classList.add('active');
            
            // 서브메뉴 현재 상태 확인
            const wasOpen = submenu.classList.contains('open');
            
            // 서브메뉴 토글
            submenu.classList.toggle('open');
            menuItemWithSubmenu.classList.toggle('open');
            
            // 아이콘 보이기/숨기기
            if (submenu.classList.contains('open')) {
                // 열림 상태 → down 아이콘 보이기
                iconRight.style.display = 'none';
                iconDown.style.display = 'block';
                
                // 처음 열 때: 현재 섹션이 하위메뉴 섹션이 아니면 홈으로 이동
                if (!wasOpen) {
                    const currentHash = window.location.hash.substring(1);
                    const isCurrentSubmenuSection = submenuSections.includes(currentHash);
                    
                    const submenuItems = document.querySelectorAll('.submenu-item');
                    submenuItems.forEach(sub => sub.classList.remove('active'));
                    
                    if (!isCurrentSubmenuSection) {
                        // 하위메뉴 섹션이 아니면 홈으로 이동
                        if (submenuItems[0]) {
                            submenuItems[0].classList.add('active');
                        }
                        switchSection('home');
                    } else {
                        // 하위메뉴 섹션이면 해당 섹션의 메뉴 아이템 활성화
                        submenuItems.forEach(item => {
                            if (item.getAttribute('data-section') === currentHash) {
                                item.classList.add('active');
                            }
                        });
                    }
                }
            } else {
                // 닫힘 상태 → right 아이콘 보이기
                iconRight.style.display = 'block';
                iconDown.style.display = 'none';
            }
        });
    }
    
    // 하위메뉴 아이템 클릭 (데스크탑)
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 일반 메뉴 아이템(설치하기, 시작하기, 이용하기)에서만 active 제거
            allMenuItems.forEach(menu => {
                if (!menu.classList.contains('has-submenu')) {
                    menu.classList.remove('active');
                }
            });
            
            // 메뉴 안내는 항상 active 유지
            if (menuItemWithSubmenu) {
                menuItemWithSubmenu.classList.add('active');
            }
            
            // 모든 하위메뉴 아이템에서 active 제거
            submenuItems.forEach(sub => sub.classList.remove('active'));
            
            // 클릭한 하위메뉴에 active 추가
            this.classList.add('active');
            
            // 섹션 전환
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                switchSection(sectionId);
            }
        });
    });
});
