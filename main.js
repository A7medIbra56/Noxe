module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/Noxe', // اسم الصفحة التي تريد تحويل المستخدم إليها
          permanent: true,
        },
      ];
    },
  };