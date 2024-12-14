// content.ts

export type Change = {
    title: string;
    date: string;
    content: string;
  };
  
  export const changes: Change[] = [
    {
      title: "New Feature Released",
      date: "2024-12-01",
      content: "<p>We released a new feature to improve user experience.</p>",
    },
    {
      title: "Bug Fixes",
      date: "2024-12-05",
      content: "<p>Fixed bugs related to the checkout process.</p>",
    },
    // Adicione mais alterações conforme necessário
  ];
  