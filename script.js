// DOM Elements
const paperBtn = document.getElementById('paperBtn');
const githubBtn = document.getElementById('githubBtn');
const arxivLink = document.getElementById('arxivLink');
const githubRepoLink = document.getElementById('githubRepoLink');
const hfLink = document.getElementById('hfLink');
const twitterLink = document.getElementById('twitterLink');

// Placeholder URLs - replace with actual links
const LINKS = {
    paper: 'https://arxiv.org/abs/XXXX.XXXXX',
    github: 'https://github.com/neulab/agent-data-protocol',
    huggingface: 'https://huggingface.co/collections/neulab/agent-data-protocol',
    twitter: 'https://twitter.com/your-username/status/XXXXXXXXXX'
};

// Stats data
const STATS = {
    datasets: 13,
    agents: 3,
    standardization: 100
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupScrollAnimations();
    updateLinks();
    setupSmoothScrolling();
    
    // Trigger stats animation immediately and after a delay
    triggerStatsAnimationDirect();
    setTimeout(() => {
        triggerStatsAnimationDirect();
    }, 1000);
}

function setupEventListeners() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Resource link clicks with analytics
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', handleResourceClick);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', handleButtonHover);
        button.addEventListener('mouseleave', handleButtonLeave);
    });

    // Header scroll effect
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
    setupIntersectionObserver();
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function handleResourceClick(e) {
    const linkType = e.target.closest('.resource-link').id;
    console.log(`Resource clicked: ${linkType}`);
    
    // Add click animation
    const card = e.target.closest('.resource-card');
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
}

function handleButtonHover(e) {
    const button = e.target;
    button.style.transform = 'translateY(-2px) scale(1.02)';
}

function handleButtonLeave(e) {
    const button = e.target;
    button.style.transform = '';
}

function handleScroll() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Trigger stats animation when scrolling
    triggerStatsAnimation();
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .feature-card, .resource-card');
    
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
    });
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger stat animation if it's a stat card
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCard(entry.target);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20px 0px'
    });

    // Observe both scroll-animate elements and stat cards specifically
    const animatedElements = document.querySelectorAll('.scroll-animate, .stat-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function animateStats() {
    // This will be triggered by intersection observer
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        statNumber.textContent = '0';
    });
}

function triggerStatsAnimation() {
    // Check if stats section is visible and trigger animation
    const statsSection = document.querySelector('.stats-section');
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statsSection && statCards.length > 0) {
        // Check if stats section is in viewport
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            statCards.forEach(card => {
                animateStatCard(card);
            });
        }
    }
}

function triggerStatsAnimationDirect() {
    // Directly set the stat values to their targets
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((statNumber, index) => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        
        // Set the final value directly
        statNumber.textContent = target;
        
        // Add animation class for visual effect
        statNumber.classList.add('animate-count');
    });
}

function animateStatCard(card) {
    const statNumber = card.querySelector('.stat-number');
    
    if (!statNumber) return;
    
    // Prevent multiple animations on the same element
    if (statNumber.classList.contains('animated')) return;
    statNumber.classList.add('animated');
    
    const target = parseInt(statNumber.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        statNumber.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            statNumber.textContent = target; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(updateNumber);
    
    // Add animation class
    statNumber.classList.add('animate-count');
}

function updateLinks() {
    // Update all placeholder links with actual URLs
    if (paperBtn) paperBtn.href = LINKS.paper;
    if (githubBtn) githubBtn.href = LINKS.github;
    if (arxivLink) arxivLink.href = LINKS.paper;
    if (githubRepoLink) githubRepoLink.href = LINKS.github;
    if (hfLink) hfLink.href = LINKS.huggingface;
    if (twitterLink) twitterLink.href = LINKS.twitter;

    // Add target="_blank" to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

function setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(handleScroll, 16);
window.addEventListener('scroll', optimizedScrollHandler);

// Add loading states for external links
function addLoadingState(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
    
    setTimeout(() => {
        element.classList.remove('loading');
        element.style.pointerEvents = '';
    }, 1000);
}

// Enhanced click handlers for resource links
document.addEventListener('click', (e) => {
    if (e.target.closest('.resource-link')) {
        const link = e.target.closest('.resource-link');
        addLoadingState(link);
        
        // Add ripple effect
        createRippleEffect(e, link);
    }
});

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #667eea !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

// Console welcome message
console.log(`
🚀 Agent Data Protocol Website
📊 ${STATS.datasets} datasets supported
🤖 ${STATS.agents} agents integrated
✅ ${STATS.standardization}% standardization

Built with modern web technologies.
`);

// Demo functionality
class DemoManager {
    constructor() {
        this.datasets = [];
        this.currentData = null;
        this.init();
    }

    async init() {
        await this.loadDatasets();
        this.setupEventListeners();
    }

    async loadDatasets() {
        try {
          // Compute base path relative to index.html (works at /web/ on GitHub Pages)
          const DS_BASE = new URL('datasets/', window.location.href).pathname;
      
          // Try manifest first
          const res = await fetch(`${DS_BASE}index.json`, { cache: 'no-store' });
          if (res.ok) {
            this.datasets = await res.json();
          } else {
            // Fallback: probe a few known names
            const possible = ['code_feedback','codeactinstruct'];
            this.datasets = [];
            for (const name of possible) {
              try {
                const test = await fetch(`${DS_BASE}${name}/sample_raw.json`);
                if (test.ok) this.datasets.push(name);
              } catch {}
            }
          }
      
          // Populate dropdown
          const sel = document.getElementById('datasetSelect');
          if (sel) {
            this.datasets.forEach(ds => {
              const opt = document.createElement('option');
              opt.value = ds;
              opt.textContent = ds.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              sel.appendChild(opt);
            });
          }
        } catch (err) {
          console.error('Error loading datasets:', err);
        }
      }
      

    setupEventListeners() {
        const loadButton = document.getElementById('loadDemo');
        if (loadButton) {
            loadButton.addEventListener('click', () => this.loadDemo());
        }
    }

    async loadDemo() {
        const datasetSelect = document.getElementById('datasetSelect');
        const agentSelect = document.getElementById('agentSelect');
        
        if (!datasetSelect || !agentSelect) return;
        
        const dataset = datasetSelect.value;
        const agent = agentSelect.value.toLowerCase();

        if (!dataset || !agent) {
            alert('Please select both a dataset and an agent.');
            return;
        }

        this.showLoading();

        try {
            // Load all three data files
            const [rawData, stdData, agentData] = await Promise.all([
                this.loadJSON(`./datasets/${dataset}/sample_raw.json`),
                this.loadJSON(`./datasets/${dataset}/sample_std.json`),
                this.loadJSON(`./datasets/${dataset}/sample_sft_${agent}.json`)
            ]);

            // Find matching items by ID (handle both string and number IDs)
            const rawItem = this.getRandomItem(rawData);
            const rawId = String(rawItem.id);
            // const stdItem = stdData.find(item => String(item.id) === rawId);
            // const agentItem = agentData.find(item => String(item.id) === rawId);
            const stdItem = this.getRandomItem(stdData); 
            const agentItem = this.getRandomItem(agentData); 

            if (!stdItem || !agentItem) {
                throw new Error('Could not find matching data across all files');
            }

            this.currentData = { raw: rawItem, std: stdItem, agent: agentItem };
            this.displayDemo();
            
        } catch (error) {
            console.error('Error loading demo:', error);
            this.showError();
        }
    }

    async loadJSON(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return await response.json();
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    displayDemo() {
        this.hideLoading();
        this.hideError();
        
        // Display raw data
        this.displayRawData();
        
        // Display standardized data
        this.displayStandardizedData();
        
        // Display agent conversation
        this.displayAgentConversation();
        
        // Show demo content
        const demoContent = document.getElementById('demoContent');
        if (demoContent) {
            demoContent.style.display = 'block';
        }
    }

    displayRawData() {
        const rawDataBlock = document.getElementById('rawDataBlock');
        if (rawDataBlock && this.currentData) {
            rawDataBlock.innerHTML = `<pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(this.currentData.raw, null, 2)}</pre>`;
        }
    }

    displayStandardizedData() {
        const stdDataBlock = document.getElementById('stdDataBlock');
        if (!stdDataBlock || !this.currentData) return;
        
        const content = this.currentData.std.content;
        
        let html = '';
        content.forEach((item, index) => {
            const isObservation = item.class_ && item.class_.includes('observation');
            const isAction = item.class_ && item.class_.includes('action');
            
            if (isObservation) {
                html += `
                    <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 4px;">
                        <div style="font-weight: 600; color: #0369a1; margin-bottom: 0.5rem; font-size: 0.9rem;">
                            <i class="fas fa-eye" style="margin-right: 0.5rem;"></i>Observation
                        </div>
                        <div style="font-size: 0.85rem; line-height: 1.4; color: #374151;">
                            ${this.escapeHtml(item.content || '')}
                        </div>
                    </div>
                `;
            } else if (isAction) {
                html += `
                    <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 4px;">
                        <div style="font-weight: 600; color: #16a34a; margin-bottom: 0.5rem; font-size: 0.9rem;">
                            <i class="fas fa-play" style="margin-right: 0.5rem;"></i>Action
                        </div>
                        ${item.function ? `
                            <div style="font-size: 0.85rem; margin-bottom: 0.5rem; color: #374151;">
                                <strong>Function:</strong> ${item.function}
                            </div>
                        ` : ''}
                        ${item.description ? `
                            <div style="font-size: 0.85rem; line-height: 1.4; color: #374151;">
                                ${this.escapeHtml(item.description)}
                            </div>
                        ` : ''}
                        ${item.content ? `
                            <div style="font-size: 0.85rem; line-height: 1.4; color: #374151;">
                                ${this.escapeHtml(item.content)}
                            </div>
                        ` : ''}
                    </div>
                `;
            }
        });
        
        stdDataBlock.innerHTML = html;
    }

    displayAgentConversation() {
        const agentDataBlock = document.getElementById('agentDataBlock');
        if (!agentDataBlock || !this.currentData) return;
        
        const conversations = this.currentData.agent.conversations;
        
        let html = '';
        conversations.forEach((msg, index) => {
            const isAgent = msg.from === 'gpt' || msg.from === 'function_call';
            const isHuman = msg.from === 'human' || msg.from === 'observation';
            
            if (isAgent) {
                html += `
                    <div style="display: flex; justify-content: flex-start; margin-bottom: 1rem;">
                        <div style="max-width: 80%; background: #f3f4f6; padding: 0.75rem 1rem; border-radius: 18px 18px 18px 4px; position: relative;">
                            <div style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem; font-weight: 500;">
                                ${msg.from === 'gpt' ? 'Agent' : 'Function Call'}
                            </div>
                            <div style="font-size: 0.9rem; line-height: 1.4; color: #374151;">
                                ${this.escapeHtml(msg.value || msg.content || '')}
                            </div>
                        </div>
                    </div>
                `;
            } else if (isHuman) {
                html += `
                    <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
                        <div style="max-width: 80%; background: #667eea; color: white; padding: 0.75rem 1rem; border-radius: 18px 18px 4px 18px; position: relative;">
                            <div style="font-size: 0.75rem; color: #e0e7ff; margin-bottom: 0.25rem; font-weight: 500;">
                                ${msg.from === 'human' ? 'Human' : 'Observation'}
                            </div>
                            <div style="font-size: 0.9rem; line-height: 1.4;">
                                ${this.escapeHtml(msg.value || msg.content || '')}
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        agentDataBlock.innerHTML = html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML.replace(/\n/g, '<br>');
    }

    showLoading() {
        const loadingState = document.getElementById('loadingState');
        const demoContent = document.getElementById('demoContent');
        const errorState = document.getElementById('errorState');
        
        if (loadingState) loadingState.style.display = 'block';
        if (demoContent) demoContent.style.display = 'none';
        if (errorState) errorState.style.display = 'none';
    }

    hideLoading() {
        const loadingState = document.getElementById('loadingState');
        if (loadingState) loadingState.style.display = 'none';
    }

    showError() {
        const errorState = document.getElementById('errorState');
        const loadingState = document.getElementById('loadingState');
        const demoContent = document.getElementById('demoContent');
        
        if (errorState) errorState.style.display = 'block';
        if (loadingState) loadingState.style.display = 'none';
        if (demoContent) demoContent.style.display = 'none';
    }

    hideError() {
        const errorState = document.getElementById('errorState');
        if (errorState) errorState.style.display = 'none';
    }
}

// Initialize demo manager
let demoManager;

// Update the DOMContentLoaded event to include demo initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Initialize demo manager after a short delay to ensure DOM is ready
    setTimeout(() => {
        demoManager = new DemoManager();
    }, 100);
});

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LINKS,
        STATS,
        animateStatCard,
        createRippleEffect,
        debounce,
        throttle,
        DemoManager
    };
}