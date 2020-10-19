import { authenticatedUserVar } from "../apolloclient/makevar";
import { UserAuth } from "../interfaces/query.interface";


export default function saveUserAuth({id, token}: UserAuth ) {
  authenticatedUserVar({
    id: id,
    token: token
  })
}