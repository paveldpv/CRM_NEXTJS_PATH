import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization";
import { Schema, model, models } from "mongoose";



export const DaDataOrganizationSchema = new Schema<TDaDataOrganization>({
  dataRegistrateFormApp: {
    type: Date,
    required: false,
  },
  value: {
    type: String,
    required: false,
    default: "sfsdf",
  },
  unrestricted_value: {
    type: String,
    required: false,
  },
  data: {
    type: {
      capital: {
        type: String,
        required: false,
      },
      kpp: {
        type: Number,
        required: false,
      },
      invalid: {
        type: String,
        required: false,
      },
      management: {
        type: {
          name: {
            type: String,
            required: false,
          },
          post: {
            type: String,
            required: false,
          },
          discriminator: {
            type: String,
            required: false,
          },
        },
        
      },
      founders: Schema.Types.Mixed,
      managers: Schema.Types.Mixed,
      predecessors: Schema.Types.Mixed,
      branch_type: {
        type: String,
        required: false,
      },
      branch_count: {
        type: Number,
        required: false,
      },
      hid: {
        type: String,
        required: false,
      },
      state: {
        type: {
          status: {
            type: String,
            required: false,
          },
          actuality_date: {
            type: String,
            required: false,
          },
          registration_date: {
            type: String,
            required: false,
          },
          liquidation_date: {
            type: String,
            required: false,
          },
        },
       
      },
      // opf: {
      //   type: {
      //     // type: {
      //     //   type: String,
      //     //   required: false,
      //     // },
      //     code: {
      //       type: String,
      //       required: false,
      //     },
      //     full: {
      //       type: String,
      //       required: false,
      //     },
      //     short: {
      //       type: String,
      //       required: false,
      //     },
      //   },
        
      // },
      name: {
        type: {
          full_with_opf: {
            type: String,
            required: false,
          },
          short_with_opf: {
            type: String,
            required: false,
          },
          latin: {
            type: String,
            required: false,
          },
          full: {
            type: String,
            required: false,
          },
          short: {
            type: String,
            required: false,
          },
        },
        
      },
      inn: {
        type: String,
        required: false,
      },
      ogrn: {
        type: String,
        required: false,
      },
      okpo: {
        type: String,
        required: false,
      },
      okato: {
        type: String,
        required: false,
      },
      oktmo: {
        type: String,
        required: false,
      },
      okogu: {
        type: String,
        required: false,
      },
      okfs: {
        type: String,
        required: false,
      },
      okved: {
        type: String,
        required: false,
      },
      okveds: {
        type: [
          {
            main: {
              type: String,
              required: false,
            },
            type: {
              type: String,
              required: false,
            },
            code: {
              type: String,
              required: false,
            },
            name: {
              type: String,
              required: false,
            },
          },
        ],
      },
      address: {
        type: {
          value: {
            type: String,
            required: false,
          },
          unrestricted_value: {
            type: String,
            required: false,
          },
        },
        
      },
      phone: {
        type: String,
        required: false,
      },
      emails: {
        type: [{ value: String}],
        required: false,
      },
      ogrn_date: {
        type: String,
        required: false,
      },
      employee_count: {
        type: Number,
        required: false,
      },
    },
  },
  safeDeleted:{
    type:Boolean,
    required:true,
    default:false
  }
});

const modelDaDataOrganization =
  models.DaDataOrganizationSchema || model<TDaDataOrganization>("DaDataOrganizationSchema",DaDataOrganizationSchema);

export default modelDaDataOrganization;
