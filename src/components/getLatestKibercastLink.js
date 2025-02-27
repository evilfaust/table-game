export const getLatestKibercastLink = async () => {
    try {
      const proxyUrl = 'https://emcotech.site:3050/fetch-news';
      const response = await fetch(`${proxyUrl}?groupId=218883068&count=50`);
      const data = await response.json();
  
      if (data.response && data.response.items) {
        // Ищем первый пост, который начинается со слова "КИБЕРКАСТ"
        const kibercastPost = data.response.items.find(item => {
          if (!item.text.trim()) return false;
          
          // Проверяем, начинается ли первая непустая строка с "КИБЕРКАСТ"
          const firstLine = item.text.split('\n')
            .find(line => line.trim() !== '');
            
          return firstLine && firstLine.trim().startsWith('КИБЕРКАСТ');
        });
  
        // Если такой пост найден, формируем ссылку на него
        if (kibercastPost) {
          const postLink = `https://vk.com/wall${kibercastPost.owner_id}_${kibercastPost.id}`;
          return {
            success: true,
            link: postLink,
            title: kibercastPost.text.split('\n')[0].trim(),
            postId: kibercastPost.id,
            ownerId: kibercastPost.owner_id
          };
        } else {
          return {
            success: false,
            error: 'Пост КИБЕРКАСТ не найден'
          };
        }
      } else {
        return {
          success: false,
          error: 'Ошибка при загрузке новостей'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Ошибка при подключении к API: ${error.message}`
      };
    }
  };