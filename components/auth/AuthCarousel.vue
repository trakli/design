<template>
  <div class="login-sidebar">
    <div class="sidebar-content">
      <div v-if="activeSlides.length" class="carousel-slide">
        <slot name="slide" :slide="activeSlides[currentSlide]" :index="currentSlide">
          <div
            class="slide-image-wrapper"
            :class="{ 'slide-image-wrapper--art': activeSlides[currentSlide]?.image }"
          >
            <transition name="fade" mode="out-in">
              <img
                v-if="activeSlides[currentSlide]?.image"
                :key="`art-${currentSlide}`"
                :src="activeSlides[currentSlide].image"
                class="slide-art"
                alt=""
              />
              <component
                v-else-if="activeSlides[currentSlide]?.icon"
                :is="activeSlides[currentSlide].icon"
                :key="currentSlide"
                class="slide-icon"
              />
            </transition>
          </div>
          <div class="sidebar-text">
            <transition name="fade" mode="out-in">
              <div v-if="activeSlides[currentSlide]" :key="currentSlide" class="text-content">
                <h2>{{ activeSlides[currentSlide].title }}</h2>
                <p>{{ activeSlides[currentSlide].text }}</p>
              </div>
            </transition>
          </div>
        </slot>
        <div class="carousel-dots">
          <span
            v-for="(_, index) in activeSlides"
            :key="index"
            :class="['dot', { active: currentSlide === index }]"
            @click="currentSlide = index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Wand2 as IconAI, ArrowLeftRight as IconIntegrations, Download as IconImport } from 'lucide-vue-next';
import defaultFloatingMan from '../../assets/floating-docs-man.svg';

const props = defineProps({
  slides: {
    type: Array,
    default: null
  },
  interval: {
    type: Number,
    default: 5000
  }
});

// Optional useI18n fallback if available in consumer context
const t = typeof useI18n === 'function' ? useI18n().t : (k) => k;
const currentSlide = ref(0);

const defaultSlides = computed(() => [
  {
    title: t('carousel.ai.title') !== 'carousel.ai.title' ? t('carousel.ai.title') : 'Just ask',
    text: t('carousel.ai.text') !== 'carousel.ai.text' ? t('carousel.ai.text') : 'Log expenses, build reports and get answers by chatting with your assistant in plain language.',
    icon: IconAI
  },
  {
    title: t('carousel.integrations.title') !== 'carousel.integrations.title' ? t('carousel.integrations.title') : 'Connect your bank',
    text: t('carousel.integrations.text') !== 'carousel.integrations.text' ? t('carousel.integrations.text') : 'Link accounts with Plaid and import statements, so your transactions flow in on their own.',
    icon: IconIntegrations
  },
  {
    title: t('carousel.import.title') !== 'carousel.import.title' ? t('carousel.import.title') : 'Import anything',
    text: t('carousel.import.text') !== 'carousel.import.text' ? t('carousel.import.text') : 'Drop in a statement in any format and the assistant reads it, structured or not, into clean transactions.',
    icon: IconImport
  },
  {
    title: t('carousel.welcome.title') !== 'carousel.welcome.title' ? t('carousel.welcome.title') : "Sit back, we've got this",
    text: t('carousel.welcome.text') !== 'carousel.welcome.text' ? t('carousel.welcome.text') : 'You handle life. Trakli wrangles the receipts, the math and the mess. Welcome aboard!',
    image: defaultFloatingMan
  }
]);

const activeSlides = computed(() => (props.slides && props.slides.length ? props.slides : defaultSlides.value));

let slideInterval;

const startSlideShow = () => {
  if (props.interval <= 0) return;
  slideInterval = setInterval(() => {
    if (activeSlides.value.length) {
      currentSlide.value = (currentSlide.value + 1) % activeSlides.value.length;
    }
  }, props.interval);
};

onMounted(startSlideShow);
onBeforeUnmount(() => clearInterval(slideInterval));
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.login-sidebar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 40px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 440px;
  width: 100%;
  text-align: center;
}

.carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.slide-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  margin-bottom: 32px;

  &--art {
    height: 260px;
  }
}

.slide-icon {
  width: 140px;
  height: 140px;
  color: $primary;
}

.slide-art {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.sidebar-text {
  min-height: 110px;
  margin-bottom: 24px;
  width: 100%;

  .text-content {
    h2 {
      font-size: 22px;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 10px;
      letter-spacing: -0.01em;
    }

    p {
      font-size: 14px;
      line-height: 1.55;
      color: $text-muted;
      margin: 0;
    }
  }
}

.carousel-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: rgba(var(--color-primary-rgb), 0.2);
    cursor: pointer;
    transition: all 0.25s ease;

    &.active {
      width: 24px;
      background-color: $primary;
    }

    &:hover:not(.active) {
      background-color: rgba(var(--color-primary-rgb), 0.4);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
