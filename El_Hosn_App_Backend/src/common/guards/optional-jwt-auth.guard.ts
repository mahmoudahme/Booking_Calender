import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Run the default guard logic
        try {
            await super.canActivate(context);
        } catch (e) {
            // If it fails (e.g. no token), we still want to continue
        }
        return true;
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            return null;
        }
        return user;
    }
}
