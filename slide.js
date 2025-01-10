class ImageSlider {
    constructor() {
      this.slider = document.querySelector('.slider');
      this.slides = document.querySelectorAll('.slide');
      this.prevButton = document.querySelector('.prev');
      this.nextButton = document.querySelector('.next');
      this.dotsContainer = document.querySelector('.dots');
      
      this.currentSlide = 0;
      this.slideCount = this.slides.length;
      this.autoPlayInterval = 5000; // 5 seconds
      this.autoPlayTimer = null;
      
      this.init();
    }
  
    init() {
      // Create dots
      this.slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => this.goToSlide(index));
        this.dotsContainer.appendChild(dot);
      });
  
      // Add event listeners
      this.prevButton.addEventListener('click', () => this.prevSlide());
      this.nextButton.addEventListener('click', () => this.nextSlide());
  
      // Start autoplay
      this.startAutoPlay();
      
      // Pause autoplay on hover
      this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
  
      // Set initial state
      this.updateSlider();
    }
  
    updateSlider() {
      // Update slider position
      this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
      
      // Update dots
      const dots = this.dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSlide);
      });
    }
  
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slideCount;
      this.updateSlider();
    }
  
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
      this.updateSlider();
    }
  
    goToSlide(index) {
      this.currentSlide = index;
      this.updateSlider();
    }
  
    startAutoPlay() {
      if (this.autoPlayTimer) return;
      this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayInterval);
    }
  
    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    }
  }
  
  // Initialize the slider when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
  });