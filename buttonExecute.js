    document.getElementById('userForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      const userId = document.getElementById('userId').value;
      const apiUrl = `https://api.vkenhancer.ru/vktools.getUserRegistrationDate?id=${userId}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Не удалось получить дату регистрации.');
        }

        const data = await response.json();
        const timestamp = data.vk_tools_registration_date;

        if (timestamp) {
          const date = new Date(timestamp);
          const formattedDate = date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
          document.getElementById('result').textContent = `Дата регистрации: ${formattedDate}`;
        } else {
          document.getElementById('result').textContent = 'Не удалось получить дату регистрации.';
        }
      } catch (error) {
        document.getElementById('result').textContent = `Ошибка: ${error.message}`;
      }
    });