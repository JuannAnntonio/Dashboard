import BaseInput from '@/components/Inputs/BaseInput.vue';
import Card from '@/components/Cards/Card.vue';
import StatsCard from '@/components/Cards/StatsCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseProgress from "@/components/BaseProgress";
import BasePagination from "@/components/BasePagination";
import BaseNav from "@/components/Navbar/BaseNav";
import BaseHeader from '@/components/BaseHeader';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { Input, Tooltip, Popover } from 'element-ui';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseHeader.name, BaseHeader);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseNav.name, BaseNav);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(Card.name, Card);
    Vue.component(StatsCard.name, StatsCard);
    Vue.component(Input.name, Input);
    Vue.component('validation-provider', ValidationProvider)
    Vue.component('validation-observer', ValidationObserver)
    Vue.use(Tooltip);
    Vue.use(Popover);
  }
};

export default GlobalComponents;
