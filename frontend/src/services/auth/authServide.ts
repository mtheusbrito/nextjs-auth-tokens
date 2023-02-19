type LoginProps = {
  username: string;
  password: string;
};
const login = async (props: LoginProps) => {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Usuário ou senha inválido");
    } else {
      console.log(await response.json());
    }
  });
};

export { login };
