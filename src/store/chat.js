import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    users: [
      {
        id: 1,
        name: "Aybat",
        avatarPath:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Blue&facialHairType=Blank&clotheType=Hoodie&clotheColor=Red&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        position: "Full-stack Developer",
      },
      {
        id: 2,
        name: "Nurbek",
        avatarPath:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=red&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        position: "Backend Developer",
      },
      {
        id: 3,
        name: "Khalel",
        avatarPath:
          "https://avataaars.io/?avatarStyle=Transparent&topType=HairShortCurly&accessoriesType=Prescription01&hairColor=Yellow&facialHairType=&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        position: "Frontend Developer",
      },
      {
        id: 4,
        name: "Gulzhamal",
        avatarPath: "https://avataaars.io",
        position: "Senior Frontend Developer",
      },
    ],
    selectUser: null,
    messages: JSON.parse(localStorage.getItem("messages")) || [],
  }),
  actions: {
    setMessage(payload) {
      if (!payload.fromUserId || !payload.message) return;

      this.messages.push(payload);

      this.setLocalStorage("messages", JSON.stringify(this.messages));
    },

    setRealtimeMessage(payload) {
      if (!payload) return;

      this.messages.push(payload);
    },

    setSelectUser(payload) {
      if (!payload) return;

      this.selectUser = payload;
    },

    setLocalStorage(key, value) {
      localStorage.setItem(key, value);
    },
  },
});
