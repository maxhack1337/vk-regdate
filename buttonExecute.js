document.getElementById('userForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const primaryApiUrl = `https://vktools.dinacostudio.ru/vktools.getUserRegistrationDate?id=${userId}`;
  const backupApiUrl = `https://api.vkenhancer.ru/getRegDate?id=${userId}`;

  try {
    const response = await fetch(primaryApiUrl);
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
    try {
      const backupResponse = await fetch(backupApiUrl);
      const backupData = await backupResponse.json();
      const backupTimestamp = backupData.regDate;

      if (backupTimestamp) {
        const backupDate = new Date(backupTimestamp);
        const backupFormattedDate = backupDate.toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        document.getElementById('result').textContent = `Дата регистрации: ${backupFormattedDate}`;
      } else {
        document.getElementById('result').textContent = 'Не удалось получить дату регистрации.';
      }
    } catch (backupError) {
      document.getElementById('result').textContent = `Ошибка: ${backupError.message}`;
    }
  }
});
