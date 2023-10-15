/*--------------USER DATA---------------------*/
export type UserData = {
  cafeOwnerName: string;
  cafeOwnerLastName: string;
  cafeOwnerBirthday: string;
  cafeOwnerGmail: string;
  registeredNumber?: string;
};

export type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
  selectedLocale: any;
  handlePhoneNumber: (value: boolean) => void;
};

/*---------------OBJECT DATA------------------------*/
export type ObjectData = {
  cafeName: string;
  cafeLocation: string;
  cafeCountry: string;
  cafeTables: number;
};

export type ObjectFormProps = ObjectData & {
  updateFields: (fields: Partial<ObjectData>) => void;
  selectedLocale: any;
  localizationData: any;
};


/*----------------------OBJECT MENU DATA-------------------*/
export type Category = {
  categoryDescription: string;
  categoryImage: string;
  categoryNames: {
    [locale: string]: string;
  };
  categoryDrinks: {
    [drinkName: string]: CategoryDrink;
  };
};

export type CategoryDrink = {
  drinkName: string;
  drinkDescription: string;
  drinkPrice: number;
  drinkQuantity: number;
};

export type Drink = {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  quantity: number;
};

export type ObjectMenuData = {
  cafeDrinksCategories: { [categoryId: string]: Category };
  localization: string;
};

export type ObjectMenuProps = ObjectMenuData & {
  updateFields: (fields: Partial<ObjectMenuData>) => void;
  selectedLocale: any;
};


/*---------------------REGISTRATION DATA---------------------*/
export type FormData = {
  cafeOwnerName: string;
  cafeOwnerLastName: string;
  cafeOwnerBirthday: string;
  cafeOwnerGmail: string;
  registeredNumber?: string;
  cafeName: string;
  cafeLocation: string;
  cafeCountry: string;
  cafeTables: number;
  cafeTablesStatistic: number;
  cafeDrinksCategories: { [categoryId: string]: Category };
};