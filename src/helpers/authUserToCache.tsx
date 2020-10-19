import { authenticatedUserVar } from "../apolloclient/makevar";
import { UserAuth } from "../interfaces/query.interface";


export default function saveUserAuth({id, token, last_checkedEvents}: UserAuth ) {
  authenticatedUserVar({
    id: id,
    token: token,
    last_checkedEvents: last_checkedEvents
  })
}