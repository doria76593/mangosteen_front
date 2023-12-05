import { onMounted, ref } from 'vue';
import { http } from './Http';

export const useTags = () => {
  const hasMore = ref(false);
  const page = ref(0);
  const tags = ref<Tag[]>([]);

  onMounted(async () => {
    fetchTags();
  });
  const fetchTags = async () => {
    const response = await http.get<Resources<Tag>>('/tags', {
      kind: 'expenses',
      _mock: 'tagIndex',
      page: page.value + 1,
    });
    console.log(response);
    const { resources, pager } = response.data;
    if (pager.page == 1) {
      tags.value = resources;
    } else {
      tags.value = tags.value.concat(resources);
    }
    hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count;
    page.value = pager.page;
    console.log(hasMore.value);
  };
  return {
    fetchTags,
    page,
    hasMore,
    tags,
  };
};
