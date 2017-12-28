import {
    RenderUtils
} from 'photography-client-lib';

class Utils extends RenderUtils {

  scrollTo(element, to, duration, isHorizontal) {

    const easeInOutQuad = (t, b, c, d) => {
            //t = current time
            //b = start value
            //c = change in value
            //d = duration
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const start = isHorizontal ? element.scrollLeft : element.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);

      if (isHorizontal) {
        element.scrollLeft = val;
      } else {
        element.scrollTop = val;
      }

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

}

export default new Utils();
