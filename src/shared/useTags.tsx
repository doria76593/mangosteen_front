import { onMounted, ref } from 'vue';
import { http } from './Http';
import { AxiosResponse } from 'axios';

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>, any>>;

export const useTags = (fetcher: Fetcher) => {
  const hasMore = ref(false);
  const page = ref(0);
  const tags = ref<Tag[]>([]);

  onMounted(async () => {
    fetchTags();
  });
  const fetchTags = async () => {
    const response = await fetcher(page.value);
    const { resources, pager } = response.data;
    if (pager.page == 1) {
      tags.value = resources;
    } else {
      tags.value = tags.value.concat(resources);
    }
    hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count;
    page.value = pager.page;
  };
  return {
    fetchTags,
    page,
    hasMore,
    tags,
  };
};
