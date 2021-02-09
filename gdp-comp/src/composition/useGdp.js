import { ref, computed, watch } from 'vue';
import gsap from 'gsap';
const colors = ['red', 'yellow', 'blue', 'green', 'grey'];

export default function useGdp(gdpRef, maxSize) {
  const maxValue = computed(() => {
    if (gdpRef.value.length) {
      return Math.max(...gdpRef.value.map(it => it.value));
    }
    return 0;
  })
  const barsTarget = computed(() => {
    return gdpRef.value.map((item, index) => {
      return {
        ...item,
        color: colors[index % colors.length],
        size: (item.value / maxValue.value) * maxSize
      };
    });
  });
  const barsRef = ref([]);
  watch(
    barsTarget,
    () => {
      for (let i = 0; i < barsTarget.value.length; i++) {
        if (!barsRef.value[i]) {
          barsRef.value[i] = {
            ...barsTarget.value[i],
            size: 0,
            value: 0
          }
        }
        gsap.to(barsRef.value[i], {
          ...barsTarget.value[i],
          duration: 1
        });
      }
    },
    {
      deep: true
    }
  );
  return {
    bars: barsRef
  }
}